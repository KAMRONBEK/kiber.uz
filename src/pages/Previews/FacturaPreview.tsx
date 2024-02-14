import {
    Button,
    Card,
    CircularProgress,
    experimentalStyled,
} from '@mui/material';
import QRCode from 'react-qr-code';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import {
    invoiceAcceptDoc,
    invoiceRejectDoc,
    invoiceRemoveDoc,
    saveFacturaDoc,
} from '../../redux/thunks/docs.thunk';
import docService from '../../services/docService';
import { baseURL } from '../../utils/reqGenerator';
import moment from 'moment';
import ProviderItem from '../../components/ProviderItem/ProviderItem';
import FacturaItem from '../../components/FacturaItem';

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
    display: 'inline-block',
    padding: 15,
    marginBottom: 20,
    width: '100%',
}));

const FacturaPreview = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // @ts-ignore
    const userTin = useSelector((state) => state.auth.userTin);

    const [docData, setDocData] = useState<any>({});
    const [laoder, setLoader] = useState(true);
    const [type, setType] = useState(null);

    const [signedFile, setSignedFile] = useState(null);

    const fetchDocData = async () => {
        await docService
            .getInvoiceData(params.id, location?.state)
            // @ts-ignore
            .then((res) => {
                console.log({ res });
                // @ts-ignore
                setDocData((prev) => {
                    return {
                        ...res,
                        // incomeType: 0,
                        // buyer: {
                        //   // @ts-ignore
                        //   ...res.buyer,
                        //   category: 1,
                        //   bankId: "00446",
                        // },
                    };
                });
                // setDocData(res);

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

    const pdfUrl: any = useMemo(() => {
        if (!docData) return null;
        // @ts-ignore
        return `${baseURL}/invoice/pdf/${docData.facturaId}`;
    }, [docData]);

    const acceptHandler = () => {
        // @ts-ignore
        dispatch(invoiceAcceptDoc(signedFile, params.id));
    };

    const rejectHandler = () => {
        // @ts-ignore
        dispatch(invoiceRejectDoc(docData, params.id, 'Sababi nomalum'));
    };

    const removeHandler = () => {
        dispatch(
            // @ts-ignore
            invoiceRemoveDoc(
                { FacturaId: params.id, SellerTin: userTin },
                'invoice',
                params.id
            )
        );
    };

    const copyHanlder = () => {
        // @ts-ignore
        dispatch(saveFacturaDoc(docData, docData.productList.products));
    };

    useEffect(() => {
        fetchDocData();
    }, []);

    const vaqtObyekti = moment(docData?.contractDoc?.contractDate).format(
        'YYYY-MM-DD'
    );
    const vaqtObyekti2 = moment(docData?.contractDoc?.contractDate.$d).format(
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
    const qrCodeValue = `https://my3.soliq.uz/roaming-viewer/ru/document?id=${params.id}&filetype=1&tin=${location?.state}`;
    return (
        <div>
            {/* @ts-ignore */}
            <Header
                // @ts-ignore
                title={`Фактура № ${
                    docData?.contractDoc.contractNo || '---'
                } от ${
                    // @ts-ignore
                    moment(docData.contractDoc.contractDate).format(
                        'YYYY-MM-DD'
                    ) || '---'
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
                                                        `/main/factura/create`,
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
                {/* @ts-ignore */}
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    {/* @ts-ignore */}
                    <div
                        style={{
                            paddingRight: '20px',
                            paddingLeft: '20px',
                        }}
                    >
                        <div className="containerFactura">
                            {/* <div className="old-factura-block">
                                {docData.facturaType} к ЭСФ №
                                {docData.oldFacturaDoc.oldFacturaNo} от
                                {docData.oldFacturaDoc.oldFacturaDate}
                            </div> */}

                            <div
                                className="title"
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div
                                    style={{
                                        width: '20%',
                                    }}
                                >
                                    <p>
                                        <b>ID:</b>00011010100101001
                                    </p>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '50%',
                                        paddingTop: '50px',
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
                                                {docData.facturaDoc.facturaNo}
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
                                                {docData.contractDoc.contractNo}
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
                                        HISOBVARAQ-FAKTURA
                                    </p>
                                </div>
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
                            <div className="info-block">
                                <div className="seller-side-2">
                                    <ProviderItem
                                        name="Yetkazib beruvchi"
                                        lable={docData.seller.name}
                                    />
                                    <ProviderItem
                                        name="Manzil"
                                        lable={docData.seller.address}
                                    />
                                    <ProviderItem
                                        name="Yetkazib beruvchining identifikasiya raqami (STIR)"
                                        lable={docData.sellerTin}
                                    />
                                    <ProviderItem
                                        name="QQS to'lovchisining ro'yxatdan o'tish kodi"
                                        lable={docData.seller.vatRegCode}
                                    />
                                    <ProviderItem
                                        name="Bank hisobvarag'i"
                                        lable={docData.seller.account}
                                    />
                                    <ProviderItem
                                        name="Bank MFO"
                                        lable={docData.seller.bankId}
                                    />
                                </div>

                                <div className="buyer-side-2">
                                    <ProviderItem
                                        name="Sotib oluvchi"
                                        lable={docData.buyer.name}
                                    />
                                    <ProviderItem
                                        name="Manzil"
                                        lable={docData.buyer.address}
                                    />
                                    <ProviderItem
                                        name="Sotib oluvchining identifikasiya raqami (STIR)"
                                        lable={docData.buyerTin}
                                    />
                                    <ProviderItem
                                        name="QQS to'lovchisining ro'yxatdan o'tish kodi"
                                        lable={docData.buyer.vatRegCode}
                                    />
                                    <ProviderItem
                                        name="Bank hisobvarag'i"
                                        lable={docData.buyer.account}
                                    />
                                    <ProviderItem
                                        name="Bank MFO"
                                        lable={docData.buyer.bankId}
                                    />
                                </div>
                            </div>
                            <div className="coefficient">
                                <div className="coefficient_1">
                                    QQS to'lovidan uzilishi koeffitsiyenti
                                    (butun zanjir bo'yicha): 1,00
                                </div>
                                <div className="coefficient_2">
                                    QQS to'lovidan uzilishi koeffitsiyenti
                                    (butun zanjir bo'yicha): 0,00
                                </div>
                            </div>
                        </div>

                        <div className="containerFactura2">
                            {docData.productList.products.map((item: any) => (
                                <table
                                    cellSpacing="0"
                                    style={{ width: '100%' }}
                                    key={item.ordNo}
                                >
                                    <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Mahsulot yoki xizmatga izoh</th>
                                            <th>
                                                Tovarlarning (xizmatlarning)
                                                yagona elektron milliy
                                                katalogiga muvofiq
                                                identifikatsiya kodi va nomi
                                            </th>
                                            <th>O'lchov birligi</th>
                                            <th>Miqdori</th>
                                            <th>Narxi</th>
                                            <th>yetkazib berish qiymati</th>
                                            <th
                                                colSpan={2}
                                                className="dableHeader"
                                            >
                                                QQS
                                                {/* <th
                                                    colSpan={2}
                                                    className="firstDiv"
                                                >
                                                    QQS
                                                </th>
                                                <tr className="secundDiv">
                                                    <td>stavka</td>
                                                    <td>summa</td>
                                                </tr> */}
                                            </th>

                                            <th>
                                                QQSni hisobga olgan holda
                                                yetkazib berish qiymati
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>x</td>
                                            <td>1</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>6</td>
                                            <td>7</td>
                                            <td>8</td>
                                            <td>9</td>
                                        </tr>

                                        <tr>
                                            <td>{item.ordNo}</td>
                                            <td></td>
                                            <td>
                                                {item.catalogCode} --{' '}
                                                {item.catalogName}
                                            </td>
                                            <td>{item.packageCode}</td>
                                            <td>{item.packageName}</td>
                                            <td>{item.count}</td>
                                            <td>{item.baseSumma}</td>
                                            <td>{item.deliverySum}</td>
                                            <td>{item.vatRate}</td>
                                            <td>{item.deliverySumWithVat}</td>
                                        </tr>

                                        <tr>
                                            <td className="bold" colSpan={6}>
                                                jami:
                                            </td>
                                            <td className="center bold">
                                                {/* @ts-ignore */}
                                                {item.deliverySumWithVat}
                                            </td>
                                            <td className="center bold">
                                                {/* @ts-ignore */}
                                                {item.deliverySumWithVat}
                                            </td>
                                            <td className="center bold">
                                                {/* @ts-ignore */}
                                                {item.deliverySumWithVat}
                                            </td>
                                            <td className="center bold">
                                                {/* @ts-ignore */}
                                                {item.deliverySumWithVat}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="bold" colSpan={10}>
                                                jami to'lashga:
                                                <span
                                                    style={{
                                                        color: '#5e5b5b',
                                                        fontWeight: 'normal',
                                                    }}
                                                >
                                                    Bir milyard
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))}
                            <div className="humans-wrapper">
                                <div className="humans">
                                    <p>
                                        <b>Rahbar:</b> {docData.seller.director}
                                    </p>
                                    <p>
                                        <b>Bosh buxgalter: </b>{' '}
                                        {docData.seller.accountant}
                                    </p>
                                    <p>
                                        <b>Tovar berdi:</b>
                                        {
                                            docData.itemReleasedDoc
                                                .itemReleasedFio
                                        }
                                    </p>
                                </div>
                                <div className="humans2">
                                    <p>
                                        <b>Rahbar: </b>
                                        {docData.buyer.director}
                                    </p>
                                    <p>
                                        <b>Bosh buxgalter: </b>
                                        {docData.buyer.accountant}
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
                                identifikatsiya="12121212222111"
                                operator="didox.uz"
                                id="22211"
                                date="2023.12.16"
                            />
                            <FacturaItem
                                type="sucses"
                                title="Tasdiqlandi"
                                identifikatsiya="12121212222111"
                                operator="didox.uz"
                                id="22211"
                                date="2023.12.16"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacturaPreview;
