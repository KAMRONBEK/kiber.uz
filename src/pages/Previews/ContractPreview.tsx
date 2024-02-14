import {
    Button,
    Card,
    CircularProgress,
    experimentalStyled,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import {
    contractAcceptDoc,
    contractRejectDoc,
    contractRemoveDoc,
    saveContractDoc,
} from '../../redux/thunks/docs.thunk';
import docService from '../../services/docService';
import QRCode from 'react-qr-code';

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
    display: 'inline-block',
    padding: 15,
    marginBottom: 20,
    width: '100%',
}));

const ContractPreview = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // @ts-ignore
    const userTin = useSelector((state) => state.auth.userTin);

    const [docData, setDocData] = useState<any>(null);
    const [laoder, setLoader] = useState(true);
    const [type, setType] = useState(null);
    const [statusId, setStatusId] = useState(null);
    const [signedFile, setSignedFile] = useState(null);
    const [clients, setClients] = useState([]);
    const location = useLocation();

    const fetchDocData = () => {
        docService
            .getContractData(params.id)
            // @ts-ignore
            .then((res: any) => {
                // @ts-ignore
                setDocData(res);
                // @ts-ignore
                setStatusId(res.status);
                // @ts-ignore
                setSignedFile(res.ownerSign);
                // @ts-ignore
                setClients(res.Clients);
                // @ts-ignore
                if (userTin === res.owner.tin) setType('sender');
                else if (
                    // @ts-ignore
                    userTin ===
                    res.clients.find(
                        (item: { tin: any }) => item.tin === userTin
                    ).tin
                )
                    // @ts-ignore
                    setType('receiver');
            })
            .finally(() => setLoader(false));
    };

    const acceptHandler = () => {
        // @ts-ignore
        dispatch(contractAcceptDoc(signedFile, params.id));
    };

    const rejectHandler = () => {
        // @ts-ignore
        dispatch(contractRejectDoc(docData, params.id, 'Sababi nomalum'));
    };

    const removeHandler = () => {
        dispatch(
            // @ts-ignore
            contractRemoveDoc(
                { ContractId: params.id, OwnerTin: userTin },
                'contract',
                params.id
            )
        );
    };

    const copyHanlder = () => {
        // @ts-ignore
        dispatch(saveContractDoc(docData, docData.products));
    };

    useEffect(() => {
        fetchDocData();
    }, []);

    console.log({ docData });

    if (laoder)
        return (
            <div
                style={{
                    width: '100%',
                    minHeight: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress />
            </div>
        );
    const qrCodeValue = `https://my3.soliq.uz/roaming-viewer/ru/document?id=${params.id}&filetype=7&tin=${location?.state}`;
    return (
        <div>
            {/* @ts-ignore */}
            <Header
                // @ts-ignore
                title={`Договор № ${
                    docData?.contractDoc.contractNo || '---'
                } от ${
                    // @ts-ignore
                    docData?.contractDoc.contractDate || '---'
                }`}
            ></Header>

            <div style={{ padding: '20px' }}>
                <StyledCard elevation={12}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* <TableTag color={"primary"}>{docStatus}</TableTag> */}
                        <div style={{ display: 'flex', gridGap: '10px' }}>
                            {/* @ts-ignore */}
                            <a download target="_blank" rel="noreferrer">
                                <Button variant="contained" color="warning">
                                    Скачать PDF
                                </Button>
                            </a>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={copyHanlder}
                            >
                                Дублировать
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() =>
                                    navigate(`/main/contract/create`, {
                                        // @ts-ignore
                                        state: docData,
                                    })
                                }
                            >
                                Редактировать
                            </Button>
                            {/* @ts-ignore */}
                            {type === 'receiver' && docData?.status === 15 && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={rejectHandler}
                                    >
                                        Отказать
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={acceptHandler}
                                    >
                                        Принять
                                    </Button>
                                </>
                            )}
                            {/* @ts-ignore */}
                            {type === 'sender' && docData?.status === 15 && (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={removeHandler}
                                >
                                    Отменить
                                </Button>
                            )}
                        </div>
                    </div>
                </StyledCard>
                <div
                    className="containerContract"
                    style={{ paddingTop: '0px' }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '150px',
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <QRCode
                            style={{
                                height: '100px',
                                maxWidth: '100px',
                                width: '100px',
                            }}
                            value={qrCodeValue}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    <div className="title">
                        {/* @ts-ignore */}
                        <p>{docData.contractDoc.contractName}</p>
                        {/* @ts-ignore */}
                        <p>Договор № {docData.contractDoc.contractNo}</p>
                    </div>

                    <div className="subtitle">
                        <div className="left">
                            {/* @ts-ignore */}
                            <p>{docData.contractDoc.contractPlace}</p>
                            <p>(место заключения договора)</p>
                        </div>
                        <div className="right">
                            {/* @ts-ignore */}
                            <p>{docData.contractDoc.contractDate}</p>
                            <p>(дата заключения договора)</p>
                        </div>
                    </div>

                    <div className="info-block">
                        {/* @ts-ignore */}
                        {docData.ownerName} (именуемое в дальнейшем –
                        Исполнитель)
                        {/* @ts-ignore */}
                        {/* @ts-ignore */}в лице директора {docData.owner.fio},
                        с одной стороны, и (именуемое в дальнейшем – Заказчик) в
                        лице директора , с другой стороны, вместе именуемые
                        Стороны, а по отдельности - Сторона, заключили настоящий
                        договор о следующем:
                    </div>

                    <strong>
                        По настоящему договору Заказчик оплачивает и принимает,
                        а Исполнитель поставляет товар(услуг) на следующих
                        условиях:
                    </strong>
                    {/* @ts-ignore */}
                    {docData.products.map((product) => (
                        <table cellSpacing="0" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>
                                        Идентификационный код и название по
                                        Единому электронному национальному
                                        каталогу товаров (услуг)
                                    </th>
                                    <th>Штрих-код товара/услуги</th>
                                    <th>Единица измерения</th>
                                    <th>Количество</th>
                                    <th>Цена</th>
                                    <th>Стоимость поставки</th>
                                    <th>НДС</th>
                                    <th>Стоимость поставки с учетом НДС</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{product.ordNo}</td>
                                    <td>
                                        {product.catalogCode} "--"{' '}
                                        {product.catalogName}
                                    </td>
                                    <td>{product.barCode}</td>
                                    <td>{product.measureId}</td>
                                    <td>{product.count}</td>
                                    <td>{product.summa}</td>
                                    <td>{product.deliverySum}</td>
                                    <td>{product.vatRate}</td>
                                    <td>{product.deliverySumWithVat}</td>
                                </tr>
                                <tr>
                                    <td className="bold" colSpan={8}>
                                        Итого
                                    </td>
                                    <td className="center bold"></td>
                                </tr>
                            </tbody>
                        </table>
                    ))}

                    <p className="bold">
                        Общая сумма договора составляет Сто пятнадцать тысяч сум
                        00 тийин (сумма прописью)
                    </p>

                    <div className="part-title"></div>
                    <div className="part-body"></div>

                    <div className="title">
                        <p>Юридические адреса и реквизиты сторон</p>
                    </div>

                    <div className="humans-wrapper">
                        <div className="humans">
                            <p>
                                <b>Исполнитель: </b>
                            </p>
                            <p>
                                {/* @ts-ignore */}
                                <b>Наименование:{docData.owner.name} </b>
                            </p>
                            <p>
                                {/* @ts-ignore */}
                                <b>Адрес:{docData.owner.address} </b>
                            </p>
                            <p>
                                {/* @ts-ignore */}
                                <b>Тел:{docData.owner.workPhone} </b>
                            </p>
                            <p>
                                {/* @ts-ignore */}
                                <b>Факс:{docData.owner.fax} </b>
                            </p>
                            <p>
                                {/* @ts-ignore */}
                                <b>ИНН:{docData.owner.tin} </b>
                            </p>
                            <p>
                                {/* @ts-ignore */}
                                <b>ОКЭД: {docData.owner.oked}</b>
                            </p>
                            <p>
                                {/* @ts-ignore */}
                                <b>Р/С: {docData.owner.account}</b>
                            </p>
                            <p>
                                <b>Банк: </b>
                            </p>
                            <p>
                                {/* @ts-ignore */}
                                <b>МФО: {docData.owner.bankId} </b>
                            </p>
                        </div>
                        <div className="humans">
                            <p>
                                <b>Заказчик: </b>
                            </p>

                            <p>
                                <b>Исполнитель: </b>
                            </p>
                            <p>
                                <b>Наименование: </b>
                            </p>
                            <p>
                                <b>Адрес: </b>
                            </p>
                            <p>
                                <b>Тел: </b>
                            </p>
                            <p>
                                <b>Факс: </b>
                            </p>
                            <p>
                                <b>ИНН: </b>
                            </p>
                            <p>
                                <b>ОКЭД: </b>
                            </p>
                            <p>
                                <b>Р/С: </b>
                            </p>
                            <p>
                                <b>Банк: </b>
                            </p>
                            <p>
                                <b>МФО: </b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractPreview;
