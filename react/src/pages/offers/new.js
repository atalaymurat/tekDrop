import React, { useState } from "react";
import OfferForm from "../../components/OfferForm";

const NewOffer = () => {
  const [ formHead, setFormHead ] = useState("SP")
  const offerHeading = (tp) =>
    (tp === "SP" && { tr: "Sipariş Formu", en: "Order Confirmation" }) ||
    (tp === "SZ" && { tr: "Sstış Sözleşmesi", en: "Sales Contract" }) ||
    (tp === "TK" && { tr: "Fiyat Teklifi", en: "Price Offer" }) ||
    (tp === "PF" && { tr: "Proforma", en: "Proforma Invoice" });
  return (
    <div>
      <div className="font-bold text-4xl text-center my-2">{offerHeading(formHead).tr}</div>
      <OfferForm formHead={formHead} setFormHead={setFormHead} />
    </div>
  );
};

export default NewOffer;
