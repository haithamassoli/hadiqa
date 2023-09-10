import { db } from "@src/firebase.config";
import { collection, getDocs, query, getDoc, doc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

type Data = {
  id: string;
  title: string;
  images: string[];
  locationLink: string;
  location: {
    latitude: number;
    longitude: number;
  };
  accordion: [
    {
      title: string;
      content: string;
    }
  ];
};

export const useData = () => useQuery(["data"], getData);

const getData = async () => {
  const q = query(collection(db, "data"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as Data;
  });
  return data;
};

export const useDataById = (id: string) =>
  useQuery(["data", id], () => getDataById(id));

const getDataById = async (id: string) => {
  const docRef = doc(db, "data", id);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data(), id: docSnap.id } as Data;
};
