import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export const AddModal = ({ handleSubmit, handleChange, setOpen, loading }) => {
  return (
    <div className="z-20 absolute w-full inset-0 p-2 flex text-gray-700 justify-center lg:backdrop-blur-xs">
      <div className="bg-[#ffffff] w-full sm:w-[65%] lg:w-[50%] h-[520px] sm:h-[540px] lg:h-[630px] my-auto lg:mt-[20px] px-8 py-)6 rounded-lg shadow-sm overflow-y-scroll">
        <div className="text-center sticky top-0 pt-6 pb-2 bg-white">
          <h1 className="text-2xl font-semibold text-gray-800">Edit intro</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to Edit intro
          </p>
        </div>
        <form className="pb-3">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            tempora corrupti dignissimos, dicta veniam labore animi et ducimus
            voluptate, deserunt eveniet ipsum aliquid recusandae provident, odit
            earum assumenda sapiente! Exercitationem deserunt recusandae amet
            qui quaerat velit inventore dolores, adipisci rem officiis voluptate
            quam doloribus natus nihil sed maxime incidunt, at id! Voluptate
            inventore quaerat magnam possimus commodi temporibus dolorum?
            Officiis, voluptas cupiditate facilis ab veritatis sed dolorem! Eius
            ullam enim ipsam facere tenetur? Quis, consequatur et ratione odit
            quia fugiat iure, labore ipsam numquam minus iusto ea, animi
            voluptatem? Hic, quae. Ipsam in fugiat quae sint ducimus, repellat
            provident assumenda omnis architecto libero rem ipsum,
            exercitationem totam et ut deleniti ullam nesciunt, eius corrupti
            cumque at. Nemo, error vero consequuntur cumque, soluta recusandae
            aliquid voluptatibus, ipsa dignissimos illo consectetur molestiae
            expedita unde nisi deserunt fugiat quaerat! Quod tenetur nihil alias
            repellat optio explicabo earum mollitia dolore sint praesentium
            omnis eveniet asperiores, deserunt autem unde iusto natus ea
            adipisci, blanditiis ex. Minima eos optio dicta provident,
            necessitatibus reprehenderit aut. Sit amet ad illum officiis tenetur
            voluptatum ut ipsum quod, itaque magni, necessitatibus quaerat
            aliquam facilis. Culpa accusamus dolore, magnam quos dignissimos
            explicabo perspiciatis facere obcaecati corporis dolorum delectus
            officia ex debitis! empora corrupti dignissimos, dicta veniam labore
            animi et ducimus voluptate, deserunt eveniet ipsum aliquid
            recusandae provident, odit earum assumenda sapiente! Exercitationem
            deserunt recusandae amet qui quaerat velit inventore dolores,
            adipisci rem officiis voluptate quam doloribus natus nihil sed
            maxime incidunt, at id! Voluptate inventore quaerat magnam possimus
            commodi temporibus dolorum? Officiis, voluptas cupiditate facilis ab
            veritatis sed dolorem! Eius ullam enim ipsam facere tenetur? Quis,
            consequatur et ratione odit quia fugiat iure, labore ipsam numquam
            minus iusto ea, animi voluptatem? Hic, quae. Ipsam in fugiat quae
            sint ducimus, repellat provident assumenda omnis architecto libero
            rem ipsum, exercitationem totam et ut deleniti ullam nesciunt, eius
            corrupti cumque at. Nemo, error vero consequuntur cumque, soluta
            recusandae aliquid voluptatibus, ipsa dignissimos illo consectetur
            molestiae expedita unde nisi deserunt fugiat quaerat! Quod tenetur
            nihil alias repellat optio explicabo earum mollitia dolore sint
            praesentium omnis eveniet asperiores, deserunt autem unde iusto
            natus ea adipisci, blanditiis ex. Minima eos optio dicta provident,
            necessitatibus reprehenderit aut. Sit amet ad illum officiis tenetur
            voluptatum ut ipsum quod, itaque magni, necessitatibus quaerat
            aliquam facilis. Culpa accusamus dolore, magnam quos dignissimos
            explicabo perspiciatis facere obcaecati corporis dolorum delectus
            officia ex debitis!
          </p>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpen(false)}
              className="bg-gray-200 text-gray-900"
              color="gray-900"
            />
            <Button
              type="submit"
              text="Save"
              loading={loading}
              className="bg-blue-600 text-[#FFFFFF]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
