import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductsByFilterAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
} from "../../product/productSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link, NavLink } from "react-router-dom";
import { Pagination } from "../../common/Pagination";
const sortOptions = [
  // of course best rating means on the top highest rated products should lie
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  // rememeber here in the sort field we are putting the name of key we have in our data like price we have in our date fetching from the api
  { name: "Price: Low to High", sort: "discountPrice", order: "asc", current: false },
  { name: "Price: High to Low", sort: "discountPrice", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProductList() {
  const products = useSelector((state) => state.product.products);
  const totalItems = useSelector((state) => state.product.totalItems);
  const brands = useSelector((state) => state.product.brands);
  const categories = useSelector((state) => state.product.categories);
  // initially filters was global now i am taking it from useSelector so now only this compnent has access of these fiilters but i have others components too to work with filter there i will send it as props
  const filters = [
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
    {
      id: "category",
      name: "Category",
      options: categories,
    },
  ];

  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  // By default Page:1 or first page would be shown from pagination
  const [page, setPage] = useState(1);
  // very importanat that you know action tells what to do then and reducer tells how to do but for combining both we always use dispatch means completing the action , whenever we modify the state always we will use dispatch ,now you know here we do not have button that as soon as we visit the website and press the button then we will get all product no as soon as we visite website we want it so of course here useEffect come to play a important role
  const handleFilter = (e, section, option) => {
    // here section is like which is main element during iterating the filters  so from the id we get the which type of filter is it like brand , category
    // const newFilter = ({...filter , [section.id]:option.value}) this is also a way of doing ,you must know when we we variable as a key so square braket is needed
    // here we are using filter state as useState hook because like you selected brand:apple and then you select category:smartphone means you need apple smartphone so both filters should be applied so ...filter means previouse value of filter should be executed and in the productListApi while creating queryString we are adding & in the last it will do like ?category:smartphone&brand:apple so this applies both filters at once
    const newFilter = { ...filter };
    if (e.target.checked) {
      // if newfilter[section.id] has something so that will work otherwise undefined
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        // at the starting point  we are creating a array with a value when newFilter[section.id] is empty
        newFilter[section.id] = [option.value];
      }
    } else {
      // means removing the section.id field from the object so that filter would be reset to previous one
      const index = newFilter[section.id].findIndex(
        (elem) => elem == option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    // newFilter se section.id delete karne ke baad setFilter bhi toh karoge na
    // console.log("newFilter is:"+newFilter);
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    // here in the json server it support sort querey like /products?_sort:price&_order:asc
    // means sort the price in the ascending order that is why both should be given and always remember that map could have only unique keys means if again you select any other sorting so same _sort and _order field would be replaced and same in case of filters
    const newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
  };
  const handlePage = (page) => {
    setPage(page);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    // In Redux Toolkit's createAsyncThunk function, you cannot directly pass multiple parameters to the thunk function without using an object as the sole argument.
    // since this page could be used by admin only so that is why only in case of admin this admin:true would be sent to as fouth parameter to this api otherwise it would be empty in case of normal person 
    dispatch(fetchAllProductsByFilterAsync({ filter, sort, pagination ,admin:true}));

    // here as soon as dispatch and filter would have some changes useEffect will be called itself
  }, [dispatch, filter, sort, page]);
  // below useState is used to open and close some filters
  // this below useEffect is for ki koi filter lagaya toh then first page mai hi aa jaye kuki koi agar vo page9 mai hai and us page mai filter vaala elem hai hi nahi toh vo toh shuruwaat ke pages mai hi hoga api sirf usi element ko fetch karegi totalItems ka count bhi badal jayega apple ke jitne device honge utne hi totalIems honge as an example
  useEffect(() => {
    setPage(1);
    // sorting mai isliye kiya because first page mai hi sabse upar rating vaale honge if user is in page9 and use i page mai sabse jyada rating vaale dikhe so this is not that convenient baad mai page9 mai khud jaa sakta hai vo
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <div>
      {/* ======================Category Filters which comes in left side and also sorting and inside it all products are displayed as well ========== */}
      {/* Here is a thing that almost everything is written twice for the desktop and mobile size  */}
      <div className="bg-white">
        <div>
          {/* ================== here one thing should be rememebered that we are sending props because here mobileFiltersOpen and setMobileFiltersOpen are being used here as well in the MobileFilter also so you can not do like declaring them with the useState again in the Mobile filter no becaues there that would be another state or block restricted state so if you are passing it as props so same state would be used by both by this component and mobile filter component so similarly here a filter useStat is being used that state would have some filter info that till now which filters are used so that other filter will add on previouse filteres if we send handlefilter as props.  */}
          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            handleFilter={handleFilter}
            filters={filters}
          ></MobileFilter>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All Products
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={(e) => handleSort(e, option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              {/* //filters for larget screen  */}
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <DesktopFilter
                  handleFilter={handleFilter}
                  filters={filters}
                ></DesktopFilter>

                {/* Product grid or displaying the product*/}
                <ProductGrid products={products}></ProductGrid>
              </div>
            </section>
          </main>
          {/* here all the filters and product list ends  */}
          {/* ================================= pagination================================================ */}
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
// you know rather than doing like const MobileFilter=(props)=>{ then use somewhere props.handleFilter} so directly do {handleFilter} means it is a field of props object
const MobileFilter = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) => {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) => {
                                    handleFilter(e, section, option);
                                  }}
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
const DesktopFilter = ({ handleFilter, filters }) => {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => {
                          handleFilter(e, section, option);
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

const ProductGrid = ({ products }) => {
  return (
    // you should know the meaning of col-span-3 means firstly a grid would be used here and like col-5 would be give to the whole page and out of those five column only three column would be taken by product list i dont know if total column 5 or 6 , parent div would have this configuration
    <div className="lg:col-span-3">
      <NavLink to="/admin/product-form">
        <button className=" mx-8 rounded-md mt-2 bg-orange-600  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add new Product
        </button>
      </NavLink>
      {/* =========================ALL Products Displaying ========================================= */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <div>
                <NavLink to={`/admin/product-details/${product.id}`}>
                  <div
                    key={product.id}
                    className="cursor-pointer group relative border-solid border-2 p-3 border-gray-200"
                  >
                    <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href={product.href}>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          <StarIcon className="w-6 h-6 inline"></StarIcon>
                          <span className="align-bottom">{product.rating}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          $
                          {product.discountPrice}
                        </p>
                        <p className="text-sm font-medium line-through text-gray-400">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                    {product.deleted?<p className="text-sm text-red-600"> Product deleted</p>:null}
                    {product.stock<=0 && <p className="text-sm text-red-400">Out of Stock</p>}
                  </div>
                </NavLink>
                <div>
                  <Link to={`/admin/product-form/edit/${product.id}`}>
                 <button className="rounded-md mt-2 bg-indigo-600  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Edit Product
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
