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
    actAcceptDoc,
    actRejectDoc,
    actRemoveDoc,
    saveActDoc,
} from '../../redux/thunks/docs.thunk';
import docService from '../../services/docService';
import { computeStatusColor } from '../../utils/getStatus';
import { baseURL } from '../../utils/reqGenerator';
import moment from 'moment';
import QRCode from 'react-qr-code';
import FacturaItem from '../../components/FacturaItem';

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
    display: 'inline-block',
    padding: 15,
    marginBottom: 20,
    width: '100%',
}));

const ActPreview = () => {
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
    const location = useLocation();

    const fetchDocData = () => {
        docService
            .getActData(params.id)
            // @ts-ignore
            .then((res) => {
                console.log({ res });
                // @ts-ignore
                setDocData(res);
                // @ts-ignore
                setStatusId(res.status);
                // @ts-ignore
                setSignedFile(res.sellerSign);
                // @ts-ignore
                if (userTin === res.sellerTin) setType('sender');
                // @ts-ignore
                else if (userTin === res.buyerTin) setType('receiver');
            })
            .finally(() => setLoader(false))
            // @ts-ignore
            .catch((err) => console.log({ err }));
    };

    const statusColor = useMemo(() => {
        if (!statusId) return null;
        return computeStatusColor(statusId);
    }, [statusId]);

    const pdfUrl: any = useMemo(() => {
        if (!docData) return null;
        // @ts-ignore
        return `${baseURL}/act/pdf/${docData.actId}`;
    }, [docData]);

    const acceptHandler = () => {
        // @ts-ignore
        dispatch(actAcceptDoc(signedFile, params.id));
    };
    const copyHanlder = () => {
        // @ts-ignore
        dispatch(saveActDoc(docData, docData.productList.products));
    };

    const rejectHandler = () => {
        // @ts-ignore
        dispatch(actRejectDoc(docData, params.id, 'Sababi nomalum'));
    };

    const removeHandler = () => {
        dispatch(
            // @ts-ignore
            actRemoveDoc(
                { ActId: params.id, SellerTin: userTin },
                'act',
                params.id
            )
        );
    };

    useEffect(() => {
        fetchDocData();
    }, []);

    const vaqtObyekti = moment(docData?.actDoc?.actDate).format('YYYY-MM-DD');
    const vaqtObyekti2 = moment(docData?.contractDoc?.contractDate).format(
        'YYYY-MM-DD'
    );

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
    const qrCodeValue = `https://my3.soliq.uz/roaming-viewer/ru/document?id=${params.id}&filetype=6&tin=${location?.state}`;
    return (
        <div>
            {/* @ts-ignore */}
            <Header
                // @ts-ignore
                title={`Акт № ${docData?.actDoc?.actNo || '---'} от ${
                    // @ts-ignore
                    docData?.actDoc?.actDat || '---'
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
                        {/* <TableTag color={statusColor}>{docData?.status}</TableTag> */}
                        <div style={{ display: 'flex', gridGap: '10px' }}>
                            {/* @ts-ignore */}
                            <a
                                download
                                href={pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
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
                            {type === 'receiver' &&
                                // @ts-ignore
                                docData?.status === 15 && (
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

                            {
                                // @ts-ignore
                                docData?.status === 0 && (
                                    <>
                                        <a
                                            download
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                onClick={() =>
                                                    navigate(
                                                        `/main/act/create`,
                                                        {
                                                            // @ts-ignore
                                                            state: docData,
                                                            // @ts-ignore
                                                        }
                                                    )
                                                }
                                            >
                                                Редактировать
                                            </Button>
                                        </a>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </StyledCard>
                {/* @ts-ignore */}
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    {/* @ts-ignore */}
                    <div style={{ padding: '0px 20px' }}>
                        <div
                            className="containerAct"
                            style={{
                                padding: '0px 20px',
                            }}
                        >
                            <div
                                className="title"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <div
                                    style={{
                                        width: '20%',
                                    }}
                                ></div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '50%',
                                        paddingTop: ' 50px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <p style={{ color: '#000' }}>
                                                {vaqtObyekti}
                                            </p>

                                            <p
                                                style={{
                                                    color: '#858484',
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                dagi
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <p style={{ color: '#000' }}>
                                                {docData?.actDoc?.actNo}
                                            </p>

                                            <p
                                                style={{
                                                    color: '#858484',
                                                }}
                                            >
                                                -sonli shartnomaga
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <p style={{ color: '#000' }}>
                                                {vaqtObyekti2}
                                            </p>

                                            <p
                                                style={{
                                                    color: '#858484',
                                                    marginLeft: '5px',
                                                }}
                                            >
                                                dagi
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <p style={{ color: '#000' }}>
                                                {
                                                    docData?.contractDoc
                                                        ?.contractNo
                                                }
                                            </p>

                                            <p
                                                style={{
                                                    color: '#858484',
                                                }}
                                            >
                                                -sonli
                                            </p>
                                        </div>
                                    </div>

                                    <p
                                        style={{
                                            fontSize: '25px',
                                            color: '#000',
                                        }}
                                    >
                                        BAJARILGAN ISHLAR BO'YICHA AKT
                                    </p>
                                </div>
                                <div
                                    style={{
                                        width: '10%',
                                    }}
                                ></div>
                                <div
                                    style={{
                                        width: '20%',
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
                            </div>
                            {/* @ts-ignore */}
                            <p className="description">
                                {docData?.actDoc?.actText}
                            </p>
                            {/* @ts-ignore */}
                            {docData.productList.products.map((product) => (
                                <table
                                    cellSpacing="0"
                                    style={{ width: '100%' }}
                                    key={product.ordNo}
                                >
                                    <thead>
                                        <tr>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                                rowSpan={2}
                                            >
                                                №{' '}
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                                rowSpan={2}
                                            >
                                                Идентификационный код и название
                                                по Единому электронному
                                                национальному каталогу товаров
                                                (услуг)
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                                rowSpan={2}
                                            >
                                                Наименование товаров (услуг)
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                                rowSpan={2}
                                            >
                                                Единица измерения
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                                rowSpan={2}
                                            >
                                                Количество
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                                rowSpan={2}
                                            >
                                                Цена
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                                rowSpan={2}
                                            >
                                                Стоимость поставки
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                                colSpan={2}
                                            >
                                                НДС
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                                rowSpan={2}
                                            >
                                                Стоимость поставки с учетом НДС
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ставка</td>
                                            <td>Сумма</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                1
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                2
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                3
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                4
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                5
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                6
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                7
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                8
                                            </td>
                                            <td
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                9
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="center">
                                                {product.ordNo}
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.packageName}</td>
                                            <td>{product.count}</td>
                                            <td>{product.summa}</td>
                                            <td>{product.totalSum}</td>
                                            <td>{product.totalSum}</td>
                                            <td>Без</td>
                                            <td>НДС</td>
                                            <td>{product.totalSum}</td>
                                        </tr>

                                        <tr>
                                            <td className="bold" colSpan={4}>
                                                Итого
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td className=" bold">
                                                {product.totalSum}
                                            </td>
                                            <td colSpan={2}></td>
                                            <td className=" bold">
                                                {product.totalSum}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))}
                            <p>Стороны претензий друг к другу не имеют.</p>
                            <p>
                                Стоимость принятой работы по акту составляет: {}
                            </p>
                            <div className="humans">
                                <p>
                                    {/* @ts-ignore */}
                                    <b>Исполнитель: {docData.sellerName}</b>
                                </p>
                                <p>
                                    {/* @ts-ignore */}
                                    <b>Заказчик: {docData.buyerName}</b>
                                </p>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '20px 200px',
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            fontWeight: '300',
                                        }}
                                    >
                                        Пудратчи:
                                    </p>
                                    <p
                                        style={{
                                            borderBottom: '2px solid black',
                                            width: '300px',
                                            paddingTop: '50px',
                                        }}
                                    ></p>
                                    <p
                                        style={{
                                            paddingTop: '30px',
                                            fontSize: '18px',
                                        }}
                                    >
                                        М.Ў.:
                                    </p>
                                </div>
                                <div>
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            fontWeight: '300',
                                        }}
                                    >
                                        Буюртмачи:
                                    </p>
                                    <p
                                        style={{
                                            borderBottom: '2px solid black',
                                            width: '300px',
                                            paddingTop: '50px',
                                        }}
                                    ></p>
                                    <p
                                        style={{
                                            paddingTop: '30px',
                                            fontSize: '18px',
                                        }}
                                    >
                                        М.Ў.:
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '20px',
                            }}
                        >
                            <FacturaItem
                                type="nosucses"
                                title="Yuborilgan"
                                identifikatsiya=""
                                operator="AXMETDJANOV BOTIR"
                                id="77d1ae0f"
                                date="2024.01.08 18:30:45"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActPreview;
