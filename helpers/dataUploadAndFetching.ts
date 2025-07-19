// import { jwtVerify } from "jose";
// import Cookies from "js-cookie";

// const usedKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_ENCRYPT_KEY);

// export async function uploadAndFetchData(e: any) {
//   //get the file
//   const file = e.target.files[0];
//   // get the file extension
//   const fileExtenstion = file.name.split(".")[1];
//   //check if the file is csv
//   if (file && fileExtenstion === "csv") {
//     // get and decrypt the session cookie
//     const { payload: session } = await jwtVerify(
//       Cookies.get("session")!,
//       usedKey,
//       {
//         algorithms: ["HS256"],
//       }
//     );
//     const authToken = session.token;
//     // error if no token is found
//     if (!authToken) throw new Error("there is no token");
//     //create formData to send files to the server
//     const formData = new FormData();
//     formData.append("csv_file", file);
//     // try to upload the file
//     try {
//       const uploadRequest = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/products/upload`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//           body: formData,
//         }
//       );
//       const uploadRes = await uploadRequest.json();
//       if (
//         uploadRes.status === 200 &&
//         uploadRes.message === "File Uploaded Successfully"
//       ) {
//         //request for fetching the data
//         const dataRequest = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer${authToken}`,
//             },
//           }
//         );
//         const dataResponse = await dataRequest.json();

//         return dataResponse.data;
//       } else {
//         throw new Error("file not uploaded");
//       }
//     } catch (err: any) {
//       console.log(err);
//     }
//   }
// }

export function handleDataNames(data: any) {
  const statistics = {
    belowMinimum: data.BelowMinimum,
    belowPar: data.BelowPar,
    negativeStock: data.NegativeStock,
    positiveStock: data.PositiveStock,
    stockInHand: data.StockOnHand,
  };
  const products = data.Products.map((item: any) => {
    return {
      date: item.Date,
      productName: item.ProductName,
      category: item.Category,
      price: item.UnitPrice,
      quantity: item.StockQuantity,
      reorderLevel: item.ReorderLevel,
      reorderQuantity: item.ReorderQuantity,
      unitsSold: item.UnitsSold,
      salesValue: item.SalesValue,
    };
  });
  return { statistics, products };
}

// export async function fetchDataWithQueries(
//   search: string | null,
//   status: string | null
// ) {
//   console.log("i am running right now ");
//   try {
//     // get and decrypt the session cookie
//     const { payload: session } = await jwtVerify(
//       Cookies.get("session")!,
//       usedKey,
//       {
//         algorithms: ["HS256"],
//       }
//     );
//     const authToken = session.token;

//     // error if no token is found
//     if (!authToken) throw new Error("there is no token");

//     //request for fetching the data
//     const dataRequest = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/products?search=${search}&status=${
//         status === "All" ? "" : status
//       }`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer${authToken}`,
//         },
//       }
//     );
//     const dataResponse = await dataRequest.json();
//     if (dataResponse.status === 200 && dataResponse.message === "Success")
//       return dataResponse.data;
//   } catch (err: any) {
//     console.log(err.message);
//   }
// }
