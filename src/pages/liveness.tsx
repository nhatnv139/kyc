// @ts-nocheck
import React from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { FaceLivenessDetector } from '@aws-amplify/ui-react-liveness';
import { Loader, Flex } from '@aws-amplify/ui-react';
import { CONFIG, KYC_STATUS } from '../config/config';
import { FaceLivenessResult } from './face-liveness-result';
import { KycFail } from './kyc-fail';
import { LANG } from '../lang';
import { View, Heading, Alert, Card, Text, Image } from '@aws-amplify/ui-react';
import warningIcon from '../images/warning.svg';
import subtractSvg from '../images/subtract.svg';
import goodFitImg from '../images/good-fit.png';
import tooFarImg from '../images/too-far.png';
import successIcon from '../images/tick.svg';
import errorIcon from '../images/close.svg';

const axiosInstance = axios.create({
  baseURL: CONFIG.VITE_API_URL,
});

export function Liveness() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [resultData, setResultData] = React.useState<{
    kycStatus: number;
    liveCheckStatus: number;
    faceMatchStatus: number;
  } | null>(null);
  const [sessionId, setSessionId] = React.useState<string>('');
  const [displayText, setDisplayText] = React.useState<any>(undefined);
  const [searchParams] = useSearchParams();

  const fetchCreateLiveness = async () => {
    setLoading(true);
    try {
      const token = searchParams.get('token');
      const response = await axiosInstance.post('/liveness/create-session', { kyc_token: token });
      const responseData = response.data;
      if (responseData.data?.sessionId) {
        setSessionId(responseData.data?.sessionId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    console.log(searchParams.get('lang'))
    const lang = String(searchParams.get('lang') || 'en');
    if (Object.keys(LANG).includes(lang)) {
      setDisplayText(LANG[lang as keyof typeof LANG]);
    }

    const token = searchParams.get('token');
    if (!token) {
      setLoading(false);
      return;
    }

    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    try {
      const token = searchParams.get('token');
      const response = await axiosInstance.post('/liveness/result', {
        kyc_token: token,
        session_id: sessionId,
      });

      const data = await response.data.data;

      if (data.kycStatus == KYC_STATUS.PENDING) {
        fetchCreateLiveness();
      } else {
        setResultData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserCancel = async () => {
    handleAnalysisComplete();
  };

  const handleError = async () => {
    console.log('handleError');
  };

  if (loading) {
    return (
      <Flex justifyContent={'center'} alignItems={'center'} style={{ minHeight: '100vh' }}>
        <Loader size="large" />
      </Flex>
    );
  }

  if (!sessionId) {
    return <KycFail displayText={displayText} />;
  }

  if (resultData) {
    return <FaceLivenessResult resultData={resultData} displayText={displayText} />;
  }

  // const config = {
  //   binaryPath: 'https://cdn.liveness.rekognition.aws.dev/face-detection/tensorflow/tfjs-backend-wasm/3.11.0/',
  //   faceModelUrl:
  //     'https://cdn.liveness.rekognition.aws.dev/face-detection/tensorflow-models/blazeface/0.0.7/model/model.json ',
  // };

  // const config = {
  //   binaryPath: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@3.11.0/dist/',
  //   faceModelUrl: `${CONFIG.VITE_API_URL}/blazeface/model.json`,
  // };

  // @ts-ignore
  return (
    <FaceLivenessDetector
      sessionId={sessionId}
      region={CONFIG.VITE_AWS_PROJECT_REGION}
      onAnalysisComplete={handleAnalysisComplete}
      onUserCancel={handleUserCancel}
      onError={handleError}
      disableStartScreen={ false }
      displayText={displayText}
      components={{
        Header: () => {
          return (
            <View flex="1">
              <Heading className='heading-title-custom' style={{paddingTop: "24px"}}>{displayText?.instructionsHeaderHeadingText}</Heading>
              <Text className='amplify-text-custom'>
                {displayText?.instructionsHeaderBodyText}
              </Text>
            </View>
          );
        },
        PhotosensitiveWarning: (): JSX.Element => {
          return (
            <Alert
              variation="error"
              isDismissible={false}
              hasIcon={false}
              className='amplify-alert--error-custom'
            >
              <Flex justifyContent={'space-between'}>
                <div className='head-warning'>{displayText?.photosensitivyWarningHeadingText}</div>
                <Image src={warningIcon} alt='warning' />
              </Flex>
              {displayText?.photosensitivyWarningBodyText}
            </Alert>
          );
        },
        Instructions: (): JSX.Element => {
          return (
            <div className='introductions-container-custom'>
              <p className='introduction_title_custom'>{displayText?.instructionListHeadingText}</p>
              <Flex>
                <div>
                  <div className='introductions_img_container'>
                    <img className='introductions_img_custom_bg' src={subtractSvg} alt='subtractBg' />
                    <img className='introductions_img_custom_good' src={goodFitImg} alt='goog-fit' />
                  </div>
                  <Flex alignItems={'center'} gap={'0px'} justifyContent={'center'} className='introductions_img_content'>
                    <span className='success'>
                      {displayText?.goodFitCaptionText}
                    </span>
                    <img src={successIcon} alt='success'/>
                  </Flex>
                </div>
                <div >
                  <div className='introductions_img_container'>
                    <img className='introductions_img_custom_bg' src={subtractSvg} alt='subtractBg' />
                    <img className='introductions_img_custom' src={tooFarImg} alt='goog-fit' style={{ left: '20%', top: '20px'}} />
                  </div>
                  <Flex alignItems={'center'} gap={'0px'} justifyContent={'center'} className='introductions_img_content'>
                    <span className='error'>
                      {displayText?.tooFarCaptionText}
                    </span>
                    <img src={errorIcon} alt='error'/>
                  </Flex>
                </div>

              </Flex>
              <ol>
                <li>
                  {displayText?.instructionListStepOneText}
                </li>
                <li>
                 {displayText?.instructionListStepTwoText}
                </li>
                <li>
                  {displayText?.instructionListStepThreeText}
                </li>
                <li>
                  {displayText?.instructionListStepFourText}
                </li>
              </ol>
            </div>
          );
        },
      }}></FaceLivenessDetector>
  );
}
