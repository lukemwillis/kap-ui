import { NextPage } from "next";
import { useRouter } from "next/router";

const Search: NextPage = () => {

  const router = useRouter();
    return <h1>Search: {router.query.q}</h1>
}

export default Search