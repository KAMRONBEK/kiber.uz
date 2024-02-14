import './styles.scss';
type propsType = {
    id?: string;
    date?: string;
    title?: string;
    identifikatsiya?: string;
    operator?: string;
    type?: string;
};
const FacturaItem = (props: propsType) => {
    const date = new Date();
    return (
        <div
            className="factura_item"
            style={{
                border:
                    props.type === 'sucses'
                        ? '3px solid  #4baa47'
                        : '3px solid  #9d9b9b',
                background: props.type === 'sucses' ? '#d0eef4' : '#f3f3f3',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 10px',
                }}
            >
                <p>
                    <b>№</b>
                    {props.id}
                </p>
                <div style={{ display: 'flex' }}>{props.date}</div>
            </div>
            <div
                className="title"
                style={{
                    color: props.type === 'sucses' ? '#27a123' : '#9d9b9b',
                }}
            >
                <h1>{props.title}</h1>
            </div>

            <div className="identifikatsiya">
                <p>{props.identifikatsiya}</p>
            </div>
            <div>
                <p>
                    <b>operator:</b>
                    {props.operator}
                </p>
            </div>
        </div>
    );
};

export default FacturaItem;
