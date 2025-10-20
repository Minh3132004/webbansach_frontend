import { Star, StarFill } from "react-bootstrap-icons";

const renderRating = (diem : number) => {
        const star = [];
        for(let i = 0 ; i < 5 ; i++){
            if(i <= diem){
                star.push(<StarFill className="text-warning"/>)
            }else{
                star.push(<Star className="text-secondary"/>)
            }
        }
        return star;
}

export default renderRating;


