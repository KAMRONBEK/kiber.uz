import './styles.scss';
type propsType = {
    name?: string;
    lable?: string;
};

const ProviderItem = (props: propsType) => {
    return (
        <div className="provider_item">
            <div className="first_item">
                <span>{props.name}:</span>
            </div>
            <div className="secund_item">
                <span>{props.lable}</span>
            </div>
        </div>
    );
};

export default ProviderItem;
