const OneInventoryItem = ({productName,enter,exit,safetyStock,orderPoint}) => {
    return ( 
        <div className={`flex justify-center items-center gap-2 bg-primary_green rounded-sm p-2 border-2  ${((enter - exit)>orderPoint)&&'border-green-500'} 
        ${((enter - exit)<=orderPoint)&&'border-yellow-500'}  ${((enter - exit)<=safetyStock)&&'border-red-500'} `}>
            <div className="grid grid-cols md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-start">
                <p><span className="font-bold">product name:</span> {productName}</p>
                <p><span className="font-bold">enter:</span> {enter}</p>
                <p><span className="font-bold">exit:</span> {exit}</p>
                <p><span className="font-bold">inventory:</span> {enter - exit}</p>
                <p><span className="font-bold">safety stock:</span> {safetyStock}</p>
                <p><span className="font-bold">order point :</span> {orderPoint}</p>
            </div>            
        </div>
     );
}
export default OneInventoryItem;