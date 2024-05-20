import DeleteIcon from '@mui/icons-material/Delete';
import { Grow  } from '@mui/material'

function Card(props) {
    const date = new Date().toDateString()

    return <Grow  in={true} {...(true ? { timeout: 500 } : {})}><div className="card">
        <div id="card-name-date">
            <h2>{props.name[0].toUpperCase() + props.name.slice(1)}</h2>
            <p>{date}</p>
        </div>
        <div id="card-amount-delete">
            <h2 style={{ color: (props.type === "income") ? "#0A6847" : "#A91D3A" }} >
                {props.amount && "$"} {props.amount}
            </h2>
            <button onClick={() => {
                props.deleteCard(props.id)
            }}><DeleteIcon /></button>
        </div>
    </div>
    </Grow >
}

export default Card;    