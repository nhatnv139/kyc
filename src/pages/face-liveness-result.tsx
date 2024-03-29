import React from 'react';
import { Flex, Image } from '@aws-amplify/ui-react';
import kycSuccess from '../images/sucess.png';
import kycFail from '../images/error.png';
import { KYC_LIVE_CHECK, KYC_STATUS } from '../config/config';

export interface FaceLivenessResultProps {
  resultData?: any;
  displayText?: {
    kycSuccessful: String;
    kycRejected: String;
    unableVerifyUser: String;
    userNotMatch: String;
  };
}

export function FaceLivenessResult(props: FaceLivenessResultProps) {
  const resultData = props.resultData;
  const displayText = props.displayText;
  const kycStatusSuccess = resultData.kycStatus == KYC_STATUS.APPROVE;
  const notIsPerson = resultData.liveCheckStatus == KYC_LIVE_CHECK.NOT_PERSON;

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      style={{ minHeight: '100vh', padding: '15%' }}
      direction={'column'}>
      <Image alt="KYC status" src={kycStatusSuccess ? kycSuccess : kycFail} objectFit="initial" />
      <div style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 900, color: kycStatusSuccess ? '#33B469' : '#FB3838' }}>
        {kycStatusSuccess ? displayText?.kycSuccessful : displayText?.kycRejected}
      </div>
      {
        kycStatusSuccess
          ? null
          : <div style={{ fontSize: '1em', textAlign: 'center', color: '#FB3838' }}>
            {notIsPerson ? displayText?.unableVerifyUser : displayText?.userNotMatch}
          </div>
      }
    </Flex>
  );
}
