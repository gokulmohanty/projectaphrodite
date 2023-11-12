import React, {Fragment, useContext, useState} from 'react';
import createEmptyCart from '../utils/createEmptyCart';
import CheckoutContext from '../context/checkout.context';
import variantToLine from '../utils/variantToLine';
import getVariant from '../utils/getVariant';
import Customize from './Customize';
import Canvas from './Canvas';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'


const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

const multiLevelDropdown = [
  {
    id: 'multi-level-menu',
    name: 'Garment Type',
    submenu: [
      {
        name: 'Blazers & Suits',
        submenu: [
          { name: 'Silhouette 1', href: '#', index: 0},
          { name: 'Silhouette 2', href: '#', index: 1},
          { name: 'Silhouette 3', href: '#', index: 2},
          { name: 'Silhouette 4', href: '#', index: 3},
        ],
      },
      {
        name: 'Pants',
        submenu: [
          { name: 'Silhouette 1', href: '#', index: 4},
          { name: 'Silhouette 2', href: '#', index: 5},
          { name: 'Silhouette 3', href: '#', index: 6},
          { name: 'Silhouette 4', href: '#', index: 7},
        ],
      },
      {
        name: 'T-Shirts',
        submenu: [
          { name: 'Silhouette 1', href: '#', index: 8},
          { name: 'Silhouette 2', href: '#', index: 9},
          { name: 'Silhouette 3', href: '#', index: 10},
          { name: 'Silhouette 4', href: '#', index: 11},
        ],
      },
      {
        name: 'Shirts',
        submenu: [
          { name: 'Silhouette 1', href: '#', index: 12},
          { name: 'Silhouette 2', href: '#', index: 0},
          { name: 'Silhouette 3', href: '#', index: 0},
          { name: 'Silhouette 4', href: '#', index: 0},
        ],
      },
      {
        name: 'Skirts',
        submenu: [
          { name: 'Silhouette 1', href: '#', index: 0},
          { name: 'Silhouette 2', href: '#', index: 0},
          { name: 'Silhouette 3', href: '#', index: 0},
          { name: 'Silhouette 4', href: '#', index: 0},
        ],
      }
    ],
  },
  // More items if needed...
];
const filters = [
  {
    id: 'gender',
    name: 'Gender',
    options: [
      { value: 'female', label: 'Female', checked: true },
      { value: 'Male', label: 'Male', checked: false }
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'purple', label: 'Purple', checked: true },
      { value: 'pink', label: 'Pink', checked: false },
      { value: 'yellow', label: 'Yellow', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Fabric',
    options: [
      { value: 'fabric1', label: 'Fabric 1', checked: true },
      { value: 'fabric2', label: 'Fabric 2', checked: false },
      { value: 'fabric3', label: 'Fabric 3', checked: false },
      { value: 'fabric4', label: 'Fabric 4', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: true },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Test = () => {

  const {checkoutState, setCheckoutState} = useContext(CheckoutContext);

  //const [clothing, setClothing] = useState({"top": undefined, "bottom": undefined, "price": undefined})
  const [mannequinImage, setMannequinImage] = useState(null);
  const [topImage, setTopImage] = useState(null);
  const [bottomImage, setBottomImage] = useState(null);

  const [clothingIndex, setClothingIndex] = useState(0)
  const [fabricIndex, setFabricIndex] = useState(0)

  const [colorIndex, setColorIndex] = useState(0)

  const [variantState, setVariantState] = useState({
    "pos": undefined,
    "silhouette": undefined,
    "color": undefined,
    "fabric": undefined,
    "size": undefined,
  })

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Styles for the mannequin container and images
  const containerStyle = {
    position: 'relative',
    width: '150%', // Set width to 150% for scaling up
    maxWidth: '600px', // Adjust this value based on your preference
    margin: 'auto', // Center align the container
  };

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%', // Image will scale with the container
    height: 'auto', // Height will adjust automatically to maintain aspect ratio
  };

  const indexOptions = [
    [require("../images/PNGs/blazer.png"), require("../images/Transparents/blazer_edge.png")],
    [require("../images/PNGs/dress.png"), require("../images/Transparents/dress_edge.png")],
    [require("../images/PNGs/Female1.png"), require("../images/Transparents/Female1_edge.png")],
    [require("../images/PNGs/Female2.png"), require("../images/Transparents/Female2_edge.png")],
    [require("../images/PNGs/Female3.png"), require("../images/Transparents/Female3_edge.png")],
    [require("../images/PNGs/Female4.png"), require("../images/Transparents/Female4_edge.png")],
    [require("../images/PNGs/Female5.png"), require("../images/Transparents/Female5_edge.png")],
    [require("../images/PNGs/Male 3.png"), require("../images/Transparents/Male_3_edge.png")],
    [require("../images/PNGs/Male2.png"), require("../images/Transparents/Male2_edge.png")],
    [require("../images/PNGs/Male4.png"), require("../images/Transparents/Male4_edge.png")],
    [require("../images/PNGs/miniskirt.png"), require("../images/Transparents/miniskirt_edge.png")],
    [require("../images/PNGs/skirt.png"), require("../images/Transparents/skirt_edge.png")],
    [require("../images/PNGs/split-dress.png"), require("../images/Transparents/split_dress_edge.png")]    
  ]

  const fabricOptions = [
    require("../images/fabrics/2F76DBD1-17F3-4BA3-A311-441A75D73ECC.jpeg"),
    require("../images/fabrics/40F0D756-F5F5-4C2F-9528-170ACBA135A1.jpeg"),
    require("../images/fabrics/843A5D7D-4B09-4260-9846-B930F355755D.jpeg"),
    require("../images/fabrics/69517F51-6E25-4015-9868-4ECF86C6F213_4_5005_c.jpeg")
  ]

  const colorOptions = ['#e8dff5', '#fce1e4', '#fcf4dd', '#ddedea', '#daeaf6'];
  const UIInteract = async(title, index) => {
    if(title === "Color") {
      setColorIndex(index)
    }
    else if(title === "Fabric") {
      setFabricIndex(index)
    }
    else if(title === "Garment Type") {
      setClothingIndex(index)
    }
  }

  // const addClothing = async() => {
  //   if(!variantState.pos || !variantState.silhouette || !variantState.color || !variantState.fabric || !variantState.size){
  //     return console.log("Not everything is filled out to add clothing.")
  //   }
  //   if(variantState.pos === "top"){
  //     setClothing({...clothing, top : variantState})
  //   }
  //   else if(variantState.pos === "bottom") {
  //     setClothing({...clothing, bottom : variantState})
  //   }
  //   else{
  //     return console.log("Unknown POS on add clothing.")
  //   }
  // }

  // const removeClothing = async(pos) => {
  //   if(pos === "top"){
  //     setClothing({...clothing, top : undefined})
  //   }
  //   else if(pos === "bottom") {
  //     setClothing({...clothing, bottom : undefined})
  //   }
  //   else{
  //     return console.log("Unknown POS on remove clothing.")
  //   }
  // }



  // const cartInteraction = async(variantId, add) => {
  //   if (checkoutState.checkout.id === null) {
  //     setCheckoutState({
  //       client: checkoutState.client,
  //       checkout: await createEmptyCart(checkoutState.client)
  //     })
  //   }

  //   if (add) {
  //     var lineItemsToAdd = [
  //       {
  //         variantId: variantId,
  //         quantity: 1,
  //         //customAttributes: [{key: "MyKey", value: "MyValue"}]
  //       }
  //     ];
  //   }
  //   else {
  //     var lineItemIdsToRemove = [
  //       await variantToLine(checkoutState.checkout, variantId)
  //     ];
  //   }
  //   try {
  //     var checkout
  //     if (add) {
  //       checkout = await checkoutState.client.checkout.addLineItems(checkoutState.checkout.id, lineItemsToAdd)
  //     }
  //     else {
  //       checkout = await checkoutState.client.checkout.removeLineItems(checkoutState.checkout.id, lineItemIdsToRemove)
  //     }
  //     console.log("Checkout successfully executed.")
  //     setCheckoutState({
  //       client: checkoutState.client,
  //       checkout
  //     })
  //     // Check for errors
  //     if (checkout.userErrors.length > 0) {
  //       console.log("Errors!")
  //       return
  //     }
  //   }
  //   catch (err) {
  //     console.log("Error on Checkout")
  //     console.log(err.message)
  //     for(let error of JSON.parse(err.message)) {
  //       for(let field of error.field) {
  //         if(field === "checkoutId") {
  //           // This checkout is invalid, make a new one and try to checkout again
  //           setCheckoutState({
  //             client: checkoutState.client,
  //             checkout: await createEmptyCart(checkoutState.client)
  //           })
  //           return await cartInteraction(variantId, add)
  //         }
  //       }
  //     }
  //   }
  // }

  return (
    <div className="bg-white">
      <div>
        
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
                    {multiLevelDropdown.map((item) => (
                      <Disclosure as="div" key={item.id} className="border-t border-gray-200 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{item.name}</span>
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
                                {item.submenu.map((submenuItem) => (
                                  <Disclosure as="div" key={submenuItem.name}>
                                    {({ open }) => (
                                      <>
                                        <Disclosure.Button className="flex w-full items-center justify-between text-gray-500 hover:text-gray-900">
                                          <span>{submenuItem.name}</span>
                                          <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5`} />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="ml-4">
                                          <ul>
                                            {submenuItem.submenu.map((option) => (
                                              <li key={option.name} onClick={() => UIInteract(item.name, option.index)}>
                                                <a href={option.href} className="block py-2 hover:bg-gray-50">
                                                  {option.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </Disclosure.Panel>
                                      </>
                                    )}
                                  </Disclosure>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}


                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
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
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} onClick={() => UIInteract(section.name, optionIdx)} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="radio"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded-well border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onClick/>
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

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Khattoi Customization</h1>

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
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
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
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {multiLevelDropdown.map((item) => (
                      <Disclosure as="div" key={item.id} className="border-t border-b border-gray-200 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{item.name}</span>
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
                                {item.submenu.map((submenuItem) => (
                                  <Disclosure as="div" key={submenuItem.name}>
                                    {({ open }) => (
                                      <>
                                        <Disclosure.Button className="flex w-full items-center justify-between text-gray-500 hover:text-gray-900">
                                          <span>{submenuItem.name}</span>
                                          <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5`} />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="ml-4">
                                          <ul>
                                            {submenuItem.submenu.map((option) => (
                                              <li key={option.name} onClick={() => UIInteract(item.name, option.index)}>
                                                <a href={option.href} className="block py-2 hover:bg-gray-50">
                                                  {option.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </Disclosure.Panel>
                                      </>
                                    )}
                                  </Disclosure>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
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
                              <div key={option.value} onClick={() => UIInteract(section.name, optionIdx)} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="radio"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded-well` border-gray-300 text-indigo-600 focus:ring-indigo-500"
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

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div key="Name" className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 sm:h-64">
                  <Canvas selectedImage={indexOptions[clothingIndex][0]} selectedTexture={fabricOptions[fabricIndex]} selectedOutline={indexOptions[clothingIndex][1]} selectedColor={colorOptions[colorIndex]} />
                    {/* Manna */}
                    {/* <div style={containerStyle}>
                      <img src={require("../images/Female.png")} alt="Mannequin" style={imageStyle} />
                      {bottomImage && <img src={bottomImage} alt="Bottom" style={imageStyle} />}
                      {topImage && <img src={topImage} alt="Top" style={imageStyle} />}
                    </div> */}
                  </div>
                  {/* <h3 className="mt-6 text-sm text-gray-500">
                  <span className="absolute inset-0" />
                      Name
                  </h3>
                  <p className="text-base font-semibold text-gray-900">Description</p> */}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
};

export default Test;