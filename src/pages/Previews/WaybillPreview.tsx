import {
    Button,
    Card,
    CircularProgress,
    experimentalStyled,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import {
    saveWaybillDoc,
    waybillAcceptDoc,
    waybillRejectDoc,
    waybillRemoveDoc,
} from '../../redux/thunks/docs.thunk';
import docService from '../../services/docService';
import { computeStatusColor } from '../../utils/getStatus';
import moment from 'moment';
import QRCode from 'react-qr-code';

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
    display: 'inline-block',
    padding: 15,
    marginBottom: 20,
    width: '100%',
}));

const WaybillPreview = () => {
    const params = useParams();
    const dispatch = useDispatch();
    // @ts-ignore
    const userTin = useSelector((state) => state.auth.userTin);

    const [docData, setDocData] = useState<any>([]);
    const [laoder, setLoader] = useState(true);
    const [type, setType] = useState(null);
    const [statusId, setStatusId] = useState(null);
    const [signedFile, setSignedFile] = useState(null);
    const location = useLocation();

    const fetchDocData = () => {
        docService
            .getWaybillData(params.id)
            // @ts-ignore
            .then((res) => {
                // @ts-ignore
                setDocData(res);
                // @ts-ignore
                setStatusId(res.status);
                // @ts-ignore
                setSignedFile(res.carrierSign);
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

    const acceptHandler = () => {
        // @ts-ignore
        dispatch(waybillAcceptDoc(signedFile, params.id));
    };

    const rejectHandler = () => {
        // @ts-ignore
        dispatch(waybillRejectDoc(docData, params.id, 'Sababi nomalum'));
    };

    const removeHandler = () => {
        dispatch(
            // @ts-ignore
            waybillRemoveDoc(
                { waybillId: params.id, CarrierTin: userTin },
                'waybill',
                params.id
            )
        );
    };

    const copyHanlder = () => {
        // @ts-ignore
        dispatch(saveWaybillDoc(docData, docData.productList.products));
    };

    useEffect(() => {
        fetchDocData();
    }, []);

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
    const qrCodeValue = `https://my3.soliq.uz/roaming-viewer/ru/document?id=${params.id}&filetype=5&tin=${location?.state}`;

    console.log({ docData });

    return (
        <div>
            {/* @ts-ignore */}
            <Header
                title={`Путевой лист № ${
                    // @ts-ignore
                    docData?.waybillDoc.waybillNo || '---'
                } от ${
                    // @ts-ignore
                    docData?.waybillDoc.waybillDate || '---'
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
                        </div>
                    </div>
                </StyledCard>
                <div className="containerWaybill" style={{ paddingTop: '0px' }}>
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
                    <h1>Документ подписан:</h1>

                    <h1 className="underline"></h1>
                    <p>идентификатор электронного документа</p>
                    <div className="title">
                        <p>ТОВАРНО-ТРАНСПОРТНАЯ НАКЛАДНАЯ</p>
                        <div className="flex" style={{ gap: '1rem' }}>
                            {/* @ts-ignore */}
                            <p>К договору № {docData.contractDoc.contractNo}</p>
                            {/* @ts-ignore */}
                            <p>
                                К путевому листу №{' '}
                                {docData.waybillDoc.waybillNo}
                            </p>
                        </div>
                        <div className="flex" style={{ gap: '1rem' }}>
                            <p>
                                {/* @ts-ignore */}
                                {moment(
                                    docData.waybillDoc.waybillDate.$d
                                ).format('YYYY-MM-DD')}
                            </p>
                            <p>
                                {/* @ts-ignore */}
                                {moment(
                                    docData.contractDoc.contractDate.$d
                                ).format('YYYY-MM-DD')}
                            </p>
                        </div>

                        <div className="flex gap-1">
                            <p className="bold">Тип перевозки</p>
                            <p>
                                Со склада на склад <input type="checkbox" />
                            </p>
                            <p>
                                От продавца к покупателю{' '}
                                <input type="checkbox" />
                            </p>
                            <p>
                                {' '}
                                Сводная на всю смену <input type="checkbox" />
                            </p>
                        </div>
                        <div className="flex">
                            <div
                                className="flex gap-1"
                                style={{ marginRight: '1rem' }}
                            >
                                <p>Автомобиль:</p>
                            </div>
                            <div className="flex gap-1">
                                <p>госномер:</p>
                                {/* @ts-ignore */}
                                <p>{docData.truckDoc.truckRegNo}</p>
                            </div>
                            <div className="flex gap-1">
                                <p>модель:</p>
                                {/* @ts-ignore */}
                                <p>{docData.truckDoc.truckModel}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex gap-1">
                                <p>
                                    {' '}
                                    Полуприцеп: <input type="checkbox" />
                                </p>
                                <p>
                                    {' '}
                                    Прицеп: <input type="checkbox" />
                                </p>
                            </div>
                            <div className="flex gap-1">
                                <p>госномер:</p>
                                {/* @ts-ignore */}
                                <p>{docData.trailerDoc.trailerRegNo}</p>
                            </div>
                            <div className="flex gap-1">
                                <p>модель:</p>
                                {/* @ts-ignore */}
                                <p>{docData.trailerDoc.trailerModel}</p>
                            </div>
                        </div>

                        <div
                            className="flex"
                            style={{ justifyContent: 'space-between' }}
                        >
                            <div
                                className="flex"
                                style={{ marginRight: '200px' }}
                            >
                                <div>
                                    <p>Заказчик: </p>
                                    <p>ИНН:</p>
                                    <p>Грузоотправитель:</p>
                                    <p>ИНН:</p>
                                    <p>Пункт погрузки 1:</p>
                                    <p>Пункт погрузки 2:</p>
                                    <p>Переадресовка:</p>
                                </div>

                                <div>
                                    {/* @ts-ignore */}
                                    <p>{docData.customerName}</p>
                                    {/* @ts-ignore */}
                                    <p>{docData.customerTin}</p>
                                    {/* @ts-ignore */}
                                    <p>{docData.sellerName}</p>
                                    {/* @ts-ignore */}
                                    <p>{docData.sellerTin}</p>
                                    {/* @ts-ignore */}
                                    <p>{docData.pointDocs[0].pointOfLoading}</p>
                                    {/* @ts-ignore */}
                                    <p>{docData.pointDocs[1].pointOfLoading}</p>
                                    {/* @ts-ignore */}
                                    <p>{docData.pointOfRedirectAddress}</p>
                                </div>
                            </div>

                            <div className="flex gap-1">
                                <div>
                                    <p>Грузоотправитель/Перевозчик:</p>
                                    <p>ИНН:</p>
                                    <p>Грузополучатель:</p>
                                    <p>ИНН:</p>
                                    <p>Пункт разгрузки 1:</p>
                                    <p>Пункт разгрузки 2:</p>
                                    <p>Адрес нового грузополучателя:</p>
                                </div>

                                <div>
                                    {/* @ts-ignore */}
                                    <p>{docData.carrierName}</p>
                                    {/* @ts-ignore */}
                                    <p>{docData.carrierTin}</p>
                                    {/* @ts-ignore */}
                                    <p>{docData.buyerName}</p>
                                    {/* @ts-ignore */}
                                    <p>{docData.buyerTin}</p>
                                    {/* @ts-ignore */}
                                    <p>
                                        {docData.pointDocs[0].pointOfUnloading}
                                    </p>
                                    {/* @ts-ignore */}
                                    <p>
                                        {docData.pointDocs[1].pointOfUnloading}
                                    </p>
                                    {/* @ts-ignore */}
                                    <p>{docData.pointOfRedirectName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* @ts-ignore */}
                    {docData.productList.products.map((product) => (
                        <table cellSpacing="1">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>
                                        Идентификационный код и название по
                                        Единому электронному национальному
                                        каталогу товаров (услуг)
                                    </th>

                                    <th>Наименование товаров (услуг)</th>
                                    <th>Единица измерения</th>
                                    <th>Стоимость за единицу товара</th>
                                    <th>Количество</th>
                                    <th>Общая стоимость груза</th>
                                    <th>Стоимость автоперевозки</th>
                                    <th>С грузом следуют документы</th>
                                    <th>Способ опред. массы</th>
                                    <th>Класс груза</th>
                                    <th>брутто</th>
                                    <th>нетто</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="center">{product.ordNo}</td>
                                    <td> {product.catalogName}</td>
                                    <td>{product.name}</td>
                                    <td>{product.packageName}</td>
                                    <td>{product.summa}</td>
                                    <td>{product.count}</td>
                                    <td>{product.totalSum}</td>
                                    <td>{product.roadHaulageCost}</td>
                                    <td>{product.followDocuments}</td>
                                    <td>{product.methodDefineWeight}</td>
                                    <td>{product.loadClass}</td>
                                    <td>{product.weightBrutto}</td>
                                    <td>{product.weightNetto}</td>
                                </tr>

                                <tr>
                                    <td className="bold" colSpan={6}>
                                        Итого
                                    </td>
                                    <td className="center bold">
                                        {product.totalSum}
                                    </td>
                                    <td className="center bold">
                                        {product.totalSum}
                                    </td>
                                    <td className="center bold">
                                        {product.totalSum}
                                    </td>
                                    <td className="center bold">
                                        {product.totalSum}
                                    </td>
                                    <td className="center bold">
                                        {product.totalSum}
                                    </td>
                                    <td className="center bold">
                                        {product.totalSum}
                                    </td>
                                    <td className="center bold">
                                        {product.totalSum}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ))}

                    <div
                        className="flex"
                        style={{ justifyContent: 'space-between' }}
                    >
                        <div>
                            <div
                                className="flex"
                                style={{
                                    justifyContent: 'flex-start',
                                    gap: '0.5rem',
                                }}
                            >
                                <p>Особые отметки: </p>
                                {/* @ts-ignore */}
                                <p>{docData.specialNotes}</p>
                            </div>
                            <div
                                className="flex"
                                style={{
                                    justifyContent: 'flex-start',
                                    gap: '0.5rem',
                                }}
                            >
                                <p>Сдал: </p>
                                {/* @ts-ignore */}
                                <p>{docData.giverFio}</p>
                            </div>
                            <div
                                className="flex"
                                style={{
                                    justifyContent: 'flex-start',
                                    gap: '0.5rem',
                                }}
                            >
                                <p>Принял вод./эксп.: </p>
                                {/* @ts-ignore */}
                                <p>{docData.takerDriverFio}</p>
                            </div>
                        </div>
                        <div>
                            <div
                                className="flex"
                                style={{
                                    justifyContent: 'flex-start',
                                    gap: '0.5rem',
                                }}
                            >
                                <p>Сдал вод./эксп.: </p>
                                {/* @ts-ignore */}
                                {docData.giverDriverFio}
                            </div>
                            <div
                                className="flex"
                                style={{
                                    justifyContent: 'flex-start',
                                    gap: '0.5rem',
                                }}
                            >
                                <p>Принял: </p>
                                {/* @ts-ignore */}
                                {docData.takerFio}
                            </div>
                            <div
                                className="flex"
                                style={{
                                    justifyContent: 'flex-start',
                                    gap: '0.5rem',
                                }}
                            >
                                <p>Расстояние перевозок: </p>
                                {/* @ts-ignore */}
                                {
                                    docData.deliveryDistanceDoc.deliveryDistance
                                }{' '}
                                {/* @ts-ignore */}
                                {
                                    docData.deliveryDistanceDoc
                                        .deliveryDistanceInCity
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaybillPreview;
