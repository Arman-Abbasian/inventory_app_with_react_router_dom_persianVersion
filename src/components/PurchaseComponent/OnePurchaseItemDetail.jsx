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
          <span className="font-bold">کد درخواست :</span> {requestCode}
        </p>
        <p>
          <span className="font-bold">نام پرسنل :</span> {personnel}
        </p>
        <p>
          <span className="font-bold"> پست سازمانی :</span> {jobPosition}
        </p>
        <p>
          <span className="font-bold">نام محصول :</span> {productName}
        </p>
        <p>
          <span className="font-bold">تعداد :</span> {number}
        </p>
        <p>
          <span className="font-bold">مورد مصرف :</span> {consumingFor}
        </p>
        <p>
          <span className="font-bold">تامین کننده :</span> {supplier}
        </p>
        <p>
          <span className="font-bold">تاریخ :</span> {new Date(date).toLocaleDateString('fa-IR')}
        </p>
        <p>
          <span className="font-bold">تاریخ مورد نیاز :</span> {new Date(neededDate).toLocaleDateString('fa-IR')}
        </p>
      </div>
    </div>
  );
};

export default OnePurchaseItemDetail;
