import CounterOrderList from "../containers/CounterOrderList";
import { useCallback, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ORDERS } from "../graphql/queries";
import { CREATE_ORDER, SUBSCRIPTION_ORDER } from "../graphql";

const Counter = () => {
    const { loading, error, data, subscribeToMore } = useQuery(QUERY_ORDERS, { variables: { restaurantId: "s001" } });
    const [addOrder] = useMutation(CREATE_ORDER);

    useEffect(() => {
        try {
            subscribeToMore({
                document: SUBSCRIPTION_ORDER,
                variables: { restautantId: "s001" },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newOrder = subscriptionData.data;

                    console.log(newOrder);
                    console.log(prev.todayOrders);

                    return {
                        ...prev,
                        todayOrders: [newOrder, ...prev.todayOrders],
                    };
                },
            });
        } catch (e) {
            console.log(e);
        }
    }, [subscribeToMore]);

    const handleCreate = useCallback(
        (e) => {
            addOrder({
                variables: {
                    order: {
                        id: "order668",
                        tableNo: "10",
                        totalPrice: 180,
                        time: new Date(),
                        items: [
                            {
                                id: "item888",
                                name: "測試",
                                price: 120,
                                quantity: 1,
                                note: "",
                                status: "RAW"
                            }
                        ]
                    },
                }
            });
        }, [addOrder]
    );

    return (
        <div>
            {/* <Button variant="outlined"      onClick={handleCreate}>mutation</Button> */}
            <Grid container direction='column-reverse' spacing={3}>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error ^U^</p>
                ) : (
                    data.todayOrders.map(order =>
                    (<Grid item key={order.id}>
                        <CounterOrderList order={order} />
                    </Grid>))
                )}
            </Grid>
        </div>
    );
}

export default Counter;
