import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import UserService from "../../../services/api/userApi";
import ErrorLayout from "../../../components/ui/error_page";
import Spinner from "../../../components/ui/spinner";
import CustomModal from "../../../components/ui/custom-modal";
import { dateFormatter, dateAndTimeFormatter } from "../../../utils/dateFormatter";

import PropTypes from 'prop-types';

const UserIdVerification = ({ id }) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const userService = new UserService(axiosPrivate);
  const { loading, error, userVerification } = useSelector((state) => state.user);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showSelfie, setShowSelfie] = useState(false);

  const loadUserVerification = async () => {
    if (!id) return;
    await userService.fetchUserVerification(id, dispatch);
  };

  useEffect(() => {
    loadUserVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onRefresh = () => loadUserVerification();

  if (loading && !userVerification?.id) {
    return (
      <div className="flex items-center justify-center h-64"><Spinner /></div>
    );
  }

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />;

  const {
    fullName,
    country,
    dob,
    idNumber,
    idType,
    idPhotoImage,
    idSelfieImage,
    resultText,
    resultCode,
    address,
    timestamp,
    createdDate,
    lastModifiedDate,
    issuanceDate,
    expirationDate,
    gender,
    smileJobID,
    jobId
  } = userVerification || {};

  const statusSuccessful = /validated|success|approved/i.test(resultText || '') || resultCode === '1012';
  const statusColor = statusSuccessful ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';

  const labelClass = 'text-[10px] uppercase tracking-wide font-semibold opacity-70';
  const valueClass = 'text-xs font-medium break-words';
  const renderCell = (label, value) => (
    <div className="space-y-1">
      <p className={labelClass}>{label}</p>
      <p className={valueClass}>{value || '-'} </p>
    </div>
  );

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Identity Verification</h2>
        <button onClick={onRefresh} className="text-[11px] underline">Refresh</button>
      </div>
      <div className={`rounded-md px-4 py-3 text-xs font-semibold inline-block ${statusColor}`}>
        {resultText || 'Verification Status Unknown'}
      </div>

      {/* Identity */}
      <div className="grid md:grid-cols-3 gap-6">
        {renderCell('Full Name', fullName)}
        {renderCell('ID Number', idNumber)}
        {renderCell('ID Type', idType)}
        {renderCell('Gender', gender?.toUpperCase())}
        {renderCell('Country', country)}
        {renderCell('Date of Birth', dob ? dateFormatter(dob) : null)}
      </div>

      {/* Document */}
      <div className="grid md:grid-cols-3 gap-6">
        {renderCell('Issuance Date', issuanceDate ? dateFormatter(issuanceDate) : null)}
        {renderCell('Expiration Date', expirationDate ? dateFormatter(expirationDate) : 'Not Provided')}
        {renderCell('Address', address)}
      </div>

      {/* Images */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className={labelClass}>ID Document Photo</p>
          {idPhotoImage ? (
            <div className="relative group w-full max-w-xs">
              <img
                src={idPhotoImage}
                alt="ID"
                className="rounded-md shadow-sm border w-full object-cover cursor-pointer"
                onClick={() => setShowPhoto(true)}
              />
              <p className="text-[10px] mt-1 opacity-60">Click to enlarge</p>
            </div>
          ) : <p className="text-[11px] italic">No ID image</p>}
        </div>
        <div className="space-y-2">
          <p className={labelClass}>Selfie Image</p>
          {idSelfieImage ? (
            <div className="relative group w-full max-w-xs">
              <img
                src={idSelfieImage}
                alt="Selfie"
                className="rounded-md shadow-sm border w-full object-cover cursor-pointer"
                onClick={() => setShowSelfie(true)}
              />
              <p className="text-[10px] mt-1 opacity-60">Click to enlarge</p>
            </div>
          ) : <p className="text-[11px] italic">No selfie image</p>}
        </div>
      </div>

      {/* Meta */}
      <div className="grid md:grid-cols-3 gap-6">
        {renderCell('Result Code', resultCode)}
        {renderCell('Smile Job ID', smileJobID)}
        {renderCell('Job ID', jobId)}
      </div>

      {/* Timestamps */}
      <div className="grid md:grid-cols-3 gap-6">
        {renderCell('Timestamp', timestamp ? dateAndTimeFormatter(timestamp) : null)}
        {renderCell('Created Date', createdDate ? dateAndTimeFormatter(createdDate) : null)}
        {renderCell('Last Modified', lastModifiedDate ? dateAndTimeFormatter(lastModifiedDate) : null)}
      </div>

      <CustomModal isOpen={showPhoto} title='ID Document Photo' onClose={() => setShowPhoto(false)}>
        <img src={idPhotoImage} alt='ID full' className='max-h-[70vh] mx-auto rounded-md' />
      </CustomModal>
      <CustomModal isOpen={showSelfie} title='Selfie Image' onClose={() => setShowSelfie(false)}>
        <img src={idSelfieImage} alt='Selfie full' className='max-h-[70vh] mx-auto rounded-md' />
      </CustomModal>
    </div>
  );
};

export default UserIdVerification;

UserIdVerification.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};