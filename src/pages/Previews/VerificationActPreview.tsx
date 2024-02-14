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
    saveVerificationActDoc,
    verificationActAcceptDoc,
    verificationActRejectDoc,
    verificationActRemoveDoc,
} from '../../redux/thunks/docs.thunk';
import docService from '../../services/docService';
import { computeStatusColor } from '../../utils/getStatus';
import { baseURL } from '../../utils/reqGenerator';
import QRCode from 'react-qr-code';

const StyledCard = experimentalStyled(Card)(({ theme }) => ({
    display: 'inline-block',
    padding: 15,
    marginBottom: 20,
    width: '100%',
}));

const VerificationActPreview = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // @ts-ignore
    const userTin = useSelector((state) => state.auth.userTin);
    const [type, setType] = useState(null);
    const [docData, setDocData] = useState(null);
    const [laoder, setLoader] = useState(true);
    const [signedFile, setSignedFile] = useState(null);
    const location = useLocation();

    const fetchDocData = () => {
        docService
            .getVerificationActData(params.id)
            // @ts-ignore
            .then((res) => {
                // @ts-ignore
                setDocData(res);
                // @ts-ignore
                setType(res.status);
                // @ts-ignore
                setSignedFile(res.ownerSign);
                // @ts-ignore
                if (userTin === res.ownerTin) setType('sender');
                // @ts-ignore
                else if (userTin === res.partnerTin) setType('receiver');
            })
            .finally(() => setLoader(false))
            // @ts-ignore
            .catch((err) => console.log({ err }));
    };

    console.log({ docData });

    const acceptHandler = () => {
        // @ts-ignore
        dispatch(verificationActAcceptDoc(signedFile, params.id));
    };

    const rejectHandler = () => {
        // @ts-ignore
        dispatch(
            // @ts-ignore
            verificationActRejectDoc(docData, params.id, 'Sababi nomalum')
        );
    };

    const removeHandler = () => {
        dispatch(
            // @ts-ignore
            verificationActRemoveDoc(docData, params.id)
        );
    };

    const copyHanlder = () => {
        // @ts-ignore
        dispatch(
            // @ts-ignore
            saveVerificationActDoc(docData, docData.verificationActContracts)
        );
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
    const qrCodeValue = `https://my3.soliq.uz/roaming-viewer/ru/document?id=${params.id}&filetype=8&tin=${location?.state}`;
    return (
        <div>
            {/* @ts-ignore */}
            <Header
                title={`Акт Сверки № ${
                    // @ts-ignore
                    docData?.verificationActDoc.verificationActNo || '---'
                } от ${
                    // @ts-ignore
                    docData?.verificationActDoc.verificationActDate || '---'
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
                            {/* @ts-ignore */}
                            {docData.status === 0 && (
                                <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() =>
                                        navigate(
                                            `/main/act-empowerment/create`,
                                            {
                                                // @ts-ignore
                                                state: draftData,
                                            }
                                        )
                                    }
                                >
                                    Редактировать
                                </Button>
                            )}
                            {/* @ts-ignore */}
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
                <div className="containerChecked" style={{ paddingTop: '0px' }}>
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
                        <p>АКТ СВЕРКИ</p>
                        <p>№ от </p>
                    </div>
                    <p className="description"></p>

                    <table cellSpacing="0" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th colSpan={4}>
                                    По данным "DOKTOR MAHKAMOV" MCHJ, сум
                                </th>
                                <th colSpan={4}>
                                    По данным HUMO-A-SERVIS MCHJ, сум
                                </th>
                            </tr>
                            <tr>
                                <th>Дата</th>
                                <th>Документ</th>
                                <th>Дебет</th>
                                <th>Кредит</th>
                                <th>Дата</th>
                                <th>Документ</th>
                                <th>Дебет</th>
                                <th>Кредит</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* @ts-ignore */}
                            {docData.verificationActContracts.map(
                                (item: any) => (
                                    <>
                                        <tr>
                                            <td colSpan={8} className="center">
                                                №{item.contractNo} от{' '}
                                                {item.contractDate}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                Сальдо начальное:
                                            </td>
                                            <td>
                                                {item.openBalance.ownerDebit}
                                            </td>
                                            <td>
                                                {item.openBalance.ownerCredit}
                                            </td>
                                            <td colSpan={2}>
                                                Сальдо начальное:
                                            </td>
                                            <td>
                                                {item.openBalance.partnerDebit}
                                            </td>
                                            <td>
                                                {item.openBalance.partnerCredit}
                                            </td>
                                        </tr>
                                        {/* @ts-ignore */}
                                        {item.verificationActContractItems.map(
                                            (i: any) => (
                                                <tr>
                                                    <td>
                                                        {i.ownerOperationDate}
                                                    </td>
                                                    <td>
                                                        {i.ownerOperationName}
                                                    </td>
                                                    <td>{i.ownerDebit}</td>
                                                    <td>{i.ownerCredit}</td>
                                                    <td>
                                                        {i.partnerOperationDate}
                                                    </td>
                                                    <td>
                                                        {i.partnerOperationName}
                                                    </td>
                                                    <td>{i.partnerDebit}</td>
                                                    <td>{i.partnerCredit}</td>
                                                </tr>
                                            )
                                        )}

                                        <tr>
                                            <td colSpan={2}>
                                                Итого по договору:
                                            </td>
                                            <td>
                                                {item.totalBalance.ownerDebit}
                                            </td>
                                            <td>
                                                {item.totalBalance.ownerCredit}
                                            </td>
                                            <td colSpan={2}>
                                                Итого по договору:
                                            </td>
                                            <td>
                                                {item.totalBalance.partnerDebit}
                                            </td>
                                            <td>
                                                {
                                                    item.totalBalance
                                                        .partnerCredit
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                Сальдо конечное по договору:
                                            </td>
                                            <td>
                                                {item.closeBalance.ownerDebit}
                                            </td>
                                            <td>
                                                {item.closeBalance.ownerCredit}
                                            </td>
                                            <td colSpan={2}>
                                                Сальдо конечное по договору:
                                            </td>
                                            <td>
                                                {item.closeBalance.partnerDebit}
                                            </td>
                                            <td>
                                                {
                                                    item.closeBalance
                                                        .partnerCredit
                                                }
                                            </td>
                                        </tr>
                                    </>
                                )
                            )}
                            <tr>
                                <td colSpan={2}>Обороты за период:</td>
                                {/* @ts-ignore */}
                                <td>{docData.turnoverBalance.ownerDebit}</td>
                                {/* @ts-ignore */}
                                <td>{docData.turnoverBalance.ownerCredit}</td>
                                <td colSpan={2}>Обороты за период:</td>
                                {/* @ts-ignore */}
                                <td>{docData.turnoverBalance.partnerDebit}</td>
                                {/* @ts-ignore */}
                                <td>{docData.turnoverBalance.partnerCredit}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Сальдо конечное :</td>
                                {/* @ts-ignore */}
                                <td>{docData.closeBalance.ownerDebit}</td>
                                {/* @ts-ignore */}
                                <td>{docData.closeBalance.ownerCredit}</td>
                                <td colSpan={2}>Сальдо конечное :</td>
                                {/* @ts-ignore */}
                                <td>{docData.closeBalance.partnerDebit}</td>
                                {/* @ts-ignore */}
                                <td>{docData.closeBalance.partnerCredit}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>Стороны претензий друг к другу не имеют.</p>
                    <p>Стоимость принятой работы по акту составляет:</p>

                    <div className="humans">
                        <p>
                            <b>Исполнитель: </b>{' '}
                        </p>
                        <p>
                            <b>Заказчик: </b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationActPreview;
