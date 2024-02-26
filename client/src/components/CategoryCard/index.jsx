export default function CategoryCard({ category }) {
    return (
        <div className=" flex w-[200px] h-[96px] shadow-md rounded-lg bg-slate-100">
            <img src={category?.image} alt={category?.name} className="w-[80px] h-[80px] my-auto ml-1 rounded" />
            <h3 className="font-[700] text-[18px] text-black m-auto p-2 text-center">{category?.name}</h3>
        </div>
    )
}