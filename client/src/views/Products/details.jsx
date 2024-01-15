import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingCircular from "../../components/loader";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import MyTextField from "../../components/textField";
import { ContentState, convertToRaw } from "draft-js";
import useFetch from "../../hooks/useFetch";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [uid] = useIsLoggedIn("/protected");
  const [detail] = useFetch(`/products/${params.id}`);

  const [editorState, setEditorState] = useState();

  const [brandsOption, setBrandsOption] = useFetch("/getDistinctBrand");
  const [newBrandOption, setNewBrandOption] = useState("");
  const [brandController, setBrandController] = useState();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (
      uid !== undefined &&
      detail !== undefined &&
      brandsOption !== undefined
    ) {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    if (!isLoading && !uid.hasOwnProperty("uid") && uid !== undefined) {
      navigate("/");
    }
  }, [isLoading]);

  useEffect(() => {
    if (detail !== undefined && brandsOption !== undefined) {
      console.log(detail);
      const _contentState = ContentState.createFromText(detail["deskripsi"]);
      const raw = convertToRaw(_contentState);
      setEditorState(raw);
      setLoading(false);
      setBrandController(detail["brand"]);
    }
  }, [detail]);

  const handleBrandChanges = (event) => {
    setBrandController(event.target.value);
  };

  const handleNewBrandOption = () => {
    if (newBrandOption !== "") {
      setBrandsOption([...brandsOption, newBrandOption]);
      setNewBrandOption("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const dataStream = {
      namaBarang: formData.get("namaBarang"),
      namaVariasi: formData.get("namaVariasi"),
      brand: brandController,
      deskripsi: editorState["blocks"][0]["text"],
      hargaVariasi: formData.get("hargaVariasi"),
    };

    const res = await fetch(`/updateProduct/${detail["id"]}`, {
      method: "POST",
      body: JSON.stringify(dataStream),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      navigate("/dashboard");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`/deleteProduct/${detail["id"]}`, {
      credentials: "include",
    });

    if (res.ok) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingCircular></LoadingCircular>
      ) : (
        <>
          {detail != null ? (
            <div className="mb-12 md:mb-1">
              <p className="font-bold">{detail["sku"]}</p>
              <div className="UpdateProductFormWrapper md:w-full">
                <form
                  className="flex flex-col items-start gap-y-2"
                  onSubmit={handleSubmit}
                >
                  <MyTextField
                    name="namaBarang"
                    title="Nama Barang"
                    value={detail["namaBarang"]}
                  />

                  <div className="dropdownWrapper border-b-2 w-full md:w-4/5 border-sky-300 flex lg:flex-row flex-col items-start gap-y-3 md:gap-x-3 pb-1 mb-3">
                    <div className="options flex gap-x-3 w-full">
                      <label htmlFor="brand">Brand:</label>

                      <select
                        name="brand"
                        className="border-0 w-3/5"
                        onChange={handleBrandChanges}
                      >
                        <option value={detail["brand"]}>
                          {detail["brand"]}
                        </option>
                        {brandsOption.map((item, ix) =>
                          item !== detail["brand"] ? (
                            <option value={item} key={ix}>
                              {item}
                            </option>
                          ) : null
                        )}
                      </select>
                    </div>
                    <div className="addOption flex flex-row-reverse lg:flex-row justify-end gap-x-3 w-full">
                      <input
                        type="text"
                        value={newBrandOption}
                        onChange={(e) => setNewBrandOption(e.target.value)}
                      />

                      <button
                        className="hover:text-blue-500 flex"
                        onClick={() => handleNewBrandOption()}
                      >
                        Tambahkan Brand
                        <span className="lg:hidden block">:</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white h-[25rem] md:h-[15rem] mb-3">
                    <Editor
                      defaultContentState={editorState}
                      onContentStateChange={setEditorState}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                    />
                  </div>
                  <MyTextField
                    name="namaVariasi"
                    title="Variasi"
                    value={detail["namaVariasi"]}
                  />
                  <MyTextField
                    name="hargaVariasi"
                    title="Harga"
                    type="number"
                    value={detail["hargaVariasi"]}
                  />

                  <input
                    type="submit"
                    value="Update"
                    className={`px-8 py-2 rounded ${"bg-lime-500 text-zinc-50  transition-all duration-150 hover:border hover:border-lime-500 hover:bg-transparent hover:text-sky-500 cursor-pointer"} `}
                  />
                </form>

                <button
                  className="px-8 py-2 mt-4 rounded bg-red-500 text-zinc-50  transition-all duration-150 hover:border hover:border-red-500 hover:bg-transparent hover:text-sky-500 cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default ProductDetails;
