import {connect} from "react-redux";
import {createResetFavorite} from "../../store/actions"

 const Favorites = (props) => {
   return (
      <div>
        <h1> Favorites list</h1>
        <button type = "button" onClick = {() => props.dispatch(createResetFavorite())}>Reset All</button>
        {props.favorites.map((e, index) => 
        <p key = {index}>{e.name}</p>
        )}
      </div>
   )
}

const mapStateToProps = (state) => ({
   favorites: state.favoritsList
 })


export default connect(mapStateToProps)(Favorites)