import './FollowRecommendations.css';
import { useEffect, useState } from "react";
import axios from "axios";

const FollowRecommendations = (props) => {

    const [recommendations, setRecomendations] = useState([])

    const getRecommendations = () => {
        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
            .then((res) => {
                setRecomendations(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }
   
    useEffect(() => {
        getRecommendations();
    }, [props.posts])

    const follow = (id) =>{
        axios.post('https://akademia108.pl/api/social-app/follows/follow', {
            leader_id: id
        })
            .then(() => {
                props.getLatestPosts()
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="followRecommendations">       
            {recommendations.map(recommendation => {
                return (

                    <div className="recommendation" key={recommendation.id}>

                        <img src={recommendation.avatar_url} alt={recommendation.username} />
                        <h3 className="userRecommendation">{recommendation.username}</h3>
                        <button className="btn" onClick={()=>{follow(recommendation.id)}}>Follow</button>


                    </div>
                )
            })}
        </div>
    )
}
export default FollowRecommendations;