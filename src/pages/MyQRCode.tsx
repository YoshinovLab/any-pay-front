import Cookies from "js-cookie";
import React from "react";
import QRCode from "react-qr-code";

const QRCodePage: React.FC = () => {
  const userId = Cookies.get("userId");
  const origin = window.location.origin;
  const remittanceUrl = `${origin}/remittance?to=${userId}`;

  return (
    <div className="max-w-sm mx-auto my-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">My QR Code</h1>
      <div className="flex justify-center bg-white p-4 rounded">
        <QRCode value={remittanceUrl} size={300} />
      </div>
      <p className="mt-2 text-gray-600 break-all">送金用URL: {remittanceUrl}</p>
      <a
        href={remittanceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-2 text-blue-600 underline break-all"
      >
        送金ページを新しいタブで開く
      </a>
    </div>
  );
};

export default QRCodePage;
