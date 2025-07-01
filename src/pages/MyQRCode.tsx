import React from "react";

const QRCodePage: React.FC = () => {
  // ユーザーIDやURLをQRコードに変換
  const qrValue = "213278592169";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    qrValue,
  )}`;

  return (
    <div className="max-w-sm mx-auto my-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">My QR Code</h1>
      <div className="flex justify-center">
        <img src={qrUrl} alt="User QR Code" />
      </div>
      <p className="mt-2 text-gray-600">ユーザーID: {qrValue}</p>
    </div>
  );
};

export default QRCodePage;
