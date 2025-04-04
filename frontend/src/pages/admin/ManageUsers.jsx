import { Table } from "../../components/tables/Table";

export const ManageUsers = () => {
  const users = [
    {
      name: "said kachoud",
      date: "2020",
      age: 20,
      bio: "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
    },
  ];

  return (
    <div className="w-full md:w-[100%] mt-6 md:pl-[255px] 2xl:pl-[15%] sm:relative ">
      <div className="w-[100%] px-2 ">
        <h1 className="text-3xl font-semibold pb-5">Manage users</h1>
        <Table
          heads={["name", "date", "age", "bio"]}
          data={users}
          keys={["name", "date", "age", "bio"]}
        />
      </div>
    </div>
  );
};
