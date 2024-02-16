import Scroll from "./components/scroll";


export default function App() {

  let url = 'https://dummyjson.com/products?limit=100';

  return <Scroll url={url} />

}