import React from "react";
import { Label } from "../UI/Label";
import { Input } from "../UI/Input";
import { Textarea } from "../UI/Textarea";

export const AddJob = (setOpenAddJob) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center bg-black/50 text-gray-700 justify-center backdrop-blur-xs">
      <div className="bg-white w-[90%] lg:w-[50%] px-5 py-6 rounded-lg shadow-xl flex flex-wrap gap-[1%]">
        <div className="flex flex-col w-[49%] gap-2">
          <Label text={"Title of Job"} className={"text-xl font-semibold"} />
          <Input
            type={"text"}
            name={"title"}
            placeholder={"EX:Software engineer"}
            className={"border py-1 px-2 w-[100%]"}
          />
        </div>
        <div className="flex flex-col w-[49%] gap-2">
          <Label text={"Company Name"} className={"text-xl font-semibold"} />
          <Input
            type={"text"}
            name={"company"}
            placeholder={"EX:INWI"}
            className={"border py-1 px-2 w-[100%]"}
          />
        </div>
        <div className="flex flex-col w-[49%] gap-2">
          <Label text={"location"} className={"text-xl font-semibold"} />
          <Input
            type={"text"}
            name={"location"}
            placeholder={"EX:Tiznit"}
            className={"border py-1 px-2 w-[100%]"}
          />
        </div>
        <div className="flex flex-col w-[49%] gap-2">
          <Label text={"empType"} className={"text-xl font-semibold"} />
          <select className="border py-1 px-2 w-[100%]" name="empType">
            <option>select empType</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>
        <div className="flex flex-col w-[99%] gap-2">
          <Label text={"Salary"} className={"text-xl font-semibold"} />
          <div className="flex flex-row gap-1 w-[100%]">
            <Input
              type={"text"}
              name={"location"}
              placeholder={"From"}
              className={"border py-1 px-2 w-[40%]"}
            />
            <Input
              type={"text"}
              name={"location"}
              placeholder={"To"}
              className={"border py-1 px-2 w-[40%]"}
            />
            <select className="border py-1 px-2 w-[20%]" name="cuirensy">
              <option>select cuirensy</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="MAD">MAD</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-[100%] gap-2">
          <Label text={"description"} className={"text-xl font-semibold"} />
          <Textarea
            type={"text"}
            name={"description"}
            placeholder={"description"}
            className={"border py-1 px-2 w-[100%]"}
          />
        </div>
        <div className="flex flex-col w-[49%] gap-2">
          <Label text={"skills"} className={"text-xl font-semibold"} />
          <Input
            type={"text"}
            name={"skills"}
            placeholder={"skills"}
            className={"border py-1 px-2 w-[100%]"}
          />
        </div><div className="flex flex-col w-[49%] gap-2">
          <Label text={"responsibilities"} className={"text-xl font-semibold"} />
          <Input
            type={"text"}
            name={"responsibilities"}
            placeholder={"responsibilities"}
            className={"border py-1 px-2 w-[100%]"}
          />
        </div>
      </div>
    </div>
  );
};
