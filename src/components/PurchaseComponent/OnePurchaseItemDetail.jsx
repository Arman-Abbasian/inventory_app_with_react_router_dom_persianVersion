const OnePurchaseItemDetail = ({
  requestCode,
  personnel,
  jobPosition,
  productName,
  number,
  consumingFor,
  supplier,
  date,
  neededDate,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-8 flex-1 text-primary_cream">
        <p>
          <span className="font-bold">request code:</span> {requestCode}
        </p>
        <p>
          <span className="font-bold">personnel:</span> {personnel}
        </p>
        <p>
          <span className="font-bold">job position:</span> {jobPosition}
        </p>
        <p>
          <span className="font-bold">product name:</span> {productName}
        </p>
        <p>
          <span className="font-bold">number:</span> {number}
        </p>
        <p>
          <span className="font-bold">consuming for:</span> {consumingFor}
        </p>
        <p>
          <span className="font-bold">supplier:</span> {supplier}
        </p>
        <p>
          <span className="font-bold">date:</span> {date}
        </p>
        <p>
          <span className="font-bold">needed date:</span> {neededDate}
        </p>
      </div>
    </div>
  );
};

export default OnePurchaseItemDetail;
