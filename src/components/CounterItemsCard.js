import styled from 'styled-components'
import { Grid, makeStyles } from "@material-ui/core";
import { Col, Row } from 'react-bootstrap';
import { Circle } from '@mui/icons-material';
import { doing, done, primary, raw } from '../constants/styles';

const useStyles = makeStyles({
    container: {
        marginBottom: "0.8rem"
    }
});

const statusColor = (status) => {
    if (status === 'unready') return raw;
    if (status === 'preparing') return doing;
    if (status === 'ready') return done;
    return raw;
}

const CounterItemsCard = ({ items }) => {

    const classes = useStyles();

    return (
        <div >
            {items.map(item => {
                console.log(item)
                var quantity;
                if (item.orderItemInfo) {
                    quantity = item.orderItemInfo.quantity;
                } else {
                    quantity = 0;
                }
                var color = statusColor(item.orderItemInfo.state);

                return (
                    <Grid container className={classes.container}>
                        <Grid item style={{ marginRight: '5px' }}>
                            <Circle fontSize="small" style={{ color: color }} />
                        </Grid>
                        <Grid>
                            {item.name}* {quantity}
                        </Grid>
                    </Grid>
                );
            })}
        </div>
    );
}

export default CounterItemsCard;
