export default function Table({ data, columns }) {
  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block  py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <div className=" mx-auto h-full py-[2rem] mt-[5rem] rounded-[15px] shadow-2xl bg-white transform rotate-x-60 rotate-y-0 rotate-[10]">
              <table className="table-auto  w-full rounded-[15px] min-w-full text-left text-sm font-light text-surface">
                <thead className="py-[.5rem]">
                  <tr className="border-b">
                    {columns?.map((item, i) => (
                      <th
                        className="border-collapse text-[14px] px-6 py-4"
                        key={i}
                      >
                        {item?.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, i) => (
                    <tr className="border-b px-[.5rem] border-collapse" key={i}>
                      <td className="lg:px-6 pl-2      py-4">{i + 1}</td>
                      <td className="lg:px-6 py-4">{item?.name}</td>
                      <td className="lg:px-6 py-4">{item?.email}</td>
                      <td className="lg:px-6 py-4">{item?.email}</td>
                      <td className="lg:px-6 py-4">{item?.email}</td>
                      <td className="lg:px-6 py-4">{item?.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
