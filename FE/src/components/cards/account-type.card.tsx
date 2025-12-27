import Link from "next/link"

export const AccountTypeCard = ({type, getAccountCountByType}: {type: any, getAccountCountByType: (typeId: string) => number} ) => {
  return(
     <Link
        href={`/${type.slug}`}
        className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border-2 border-blue-500/30 dark:border-blue-500/10 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl transition-all duration-300 flex flex-col relative"
      >
        <div className="p-1">
          <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg relative border-b border-gray-100 dark:border-gray-800">
            <img
              src={type.image || "/images/placeholder.jpg"}
              alt={type.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 uppercase">
              Hot
            </div>
          </div>
        </div>

        <div className="p-3 pt-2 text-center flex flex-col items-center">
          <h3 className="text-[14px] font-extrabold text-blue-900 dark:text-blue-300 uppercase leading-tight mb-2 min-h-[40px] flex items-center justify-center">
            {type.name}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-xs font-bold mb-3">
            Số lượng: <span className="text-red-600 dark:text-red-400 text-sm">{getAccountCountByType(type._id)}</span> Nick
          </p>

          <div className="pt-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold py-1.5 px-6 rounded-full uppercase shadow-md hover:shadow-lg transition-all hidden group-hover:block absolute bottom-3 left-1/2 -translate-x-1/2 w-[80%] text-center">
              XEM NGAY
            </div>
          </div>
        </div>
      </Link>
  )
}