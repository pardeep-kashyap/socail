import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import { GET_FOLLWER_POST } from "../../gqlOperations/queries";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AppRouteContant } from "../../constants";
import './home.scss'

const Home = () => {
    const { data, error, loading } = useQuery(GET_FOLLWER_POST, {
        variables: {
            userId: localStorage.getItem('id')
        },
        fetchPolicy: 'no-cache'
    })
    if (loading) return (<Loader />)
    if (error) return (<div>`Error! ${error?.message}`;</div>)

    return (
        <div className="homepage">
            {data?.postsByFollower.length ? data?.postsByFollower?.map((quote: any, index: number) => (
                <div className="post-container" key={index + 'post'} >
                    <Post {...quote} />
                </div>
            )) : <div className="new-post"> <Link to={AppRouteContant.NEW}><Button variant="contained">Create New Post</Button></Link> </div>
            }
        </div >
    )
}
export default Home;