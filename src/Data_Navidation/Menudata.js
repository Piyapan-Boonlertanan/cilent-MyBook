import { HiOutlineHome,HiOutlineChatAlt } from "react-icons/hi";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { BiCategory} from "react-icons/bi";

const MenuData =[
    {
        title:"Home",
        path:'/',
        icon:<HiOutlineHome/>
    },
    {
        title:"Collection",
        path:'/collection',
        icon:<BiCategory/>
    },
    {
        title:"SongTor",
        path:'/sell-book',
        icon:<TbShoppingCartDiscount/>
    }
]
export default MenuData