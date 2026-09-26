CREATE OR ALTER VIEW dbo.BcraInternalTransactionsView
AS
/*
  RI Transferencias Internas (US 27570).
  Una fila por operación neta entre usuarios de la plataforma (Orders.OrderFlag = 5).
  CBU recaudador = BindAccountId de WalletCompanies (origen/destino vía WalletCompanyUsers).

  Universo:
    - TRANSFER (2) + OperationType WALLET (2)
    - APP_SALES (7) / CHARGE (12) + WALLET
    - Fuera de alcance: ASSESMENT_PAYMENTS / VEP / Gravámenes (23)

  Nota: el mapeo de Concept -> TransferType BCRA se realiza en el manager.
*/
SELECT
    o.OrderId,
    o.CompanyReference,
    COALESCE(o.OrderAccreditationDate, o.OrderConfirmationDate, o.OrderDate) AS OrderDate,
    YEAR(COALESCE(o.OrderAccreditationDate, o.OrderConfirmationDate, o.OrderDate)) AS OrderYear,
    MONTH(COALESCE(o.OrderAccreditationDate, o.OrderConfirmationDate, o.OrderDate)) AS OrderMonth,
    o.Concept,
    o.OperationType,
    CAST(o.Concept AS TINYINT) AS TransferType, -- valor de origen (sin mapeo BCRA)

    CAST(ABS(COALESCE(od.NetAmountOut, od.NetAmountIn, od.TotalAmountIn, 0)) AS DECIMAL(18, 2)) AS NetAmount,
    o.SenderUserId,
    o.ReceiverUserId,
    originWc.WalletCompanyId AS OriginWalletCompanyId,
    destWc.WalletCompanyId AS DestinationWalletCompanyId,
    originWc.BindAccountId AS OriginBindAccountId,
    destWc.BindAccountId AS DestinationBindAccountId,
    originWc.Name AS OriginWalletCompanyName,
    destWc.Name AS DestinationWalletCompanyName
FROM dbo.Orders o
INNER JOIN dbo.OrderDetails od ON od.OrderId = o.OrderId
INNER JOIN dbo.WalletCompanyUsers originWcu ON originWcu.UserId = o.SenderUserId
INNER JOIN dbo.WalletCompanies originWc ON originWc.WalletCompanyId = originWcu.WalletCompanyId
INNER JOIN dbo.WalletCompanyUsers destWcu ON destWcu.UserId = o.ReceiverUserId
INNER JOIN dbo.WalletCompanies destWc ON destWc.WalletCompanyId = destWcu.WalletCompanyId
WHERE o.OrderFlag = 5
  AND o.OperationType = 2 -- WALLET
  AND o.Concept IN (2, 7, 12) -- TRANSFER, APP_SALES, CHARGE
  AND o.SenderUserId IS NOT NULL
  AND o.ReceiverUserId IS NOT NULL
  AND originWc.BindAccountId IS NOT NULL
  AND destWc.BindAccountId IS NOT NULL
  AND LTRIM(RTRIM(originWc.BindAccountId)) <> ''
  AND LTRIM(RTRIM(destWc.BindAccountId)) <> '';
GO
