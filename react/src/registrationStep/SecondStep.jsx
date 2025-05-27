import React, { useEffect, useRef, useState } from 'react'
import CircularBox from '../components/CircularBox'
import CircularInput from '../components/CircularInput'
import FancyButton from '../components/FancyButton'
import '../css_files/register.css' 
import SmallCard from '../components/SmallCard'
import topBar from '../assets/Group 37318 (1).png'
import axios from 'axios'

const SecondStep = ({nextStep,prevStep,formData,onChange,setMsg}) => {

    const [files,setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState(formData?.files?.value || {});

    const validateFiles = () => {
      let isValid = true;
      let missingFiles = [];

      files.forEach(fileItem => {
          if (!uploadedFiles[fileItem.id]) {
              isValid = false;
              missingFiles.push(fileItem.name);
          }
      });

      if (!isValid) {
          setMsg('Please Upload All of the File');
      }
      return isValid;
  };

    const handleFileChange = (e, fileCategoryId) => {
      console.log(e.target.files[1]);
      const file = e.target.files[0];
      if (file) {
        setUploadedFiles(prev => ({
          ...prev,
          [fileCategoryId]: file,
        }));
      }
    };

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/files')
        .then(res => {
          setFiles(res.data);
        });
        if (formData?.files?.value) {
          setUploadedFiles(formData.files.value);
        }
        
    }, []);

    useEffect(() => {
      console.log('files updated:', files);
    }, [files]); 

    useEffect(() => {
      console.log('uploaded file:', uploadedFiles);
      onChange('files',uploadedFiles);
    }, [uploadedFiles]); 
    
  return (
    <div className='biggestPart'>
        <div className='topPart'>
            <h2 className='regisTxt'>Registration</h2>
            <p className='subTxt'>Silahkan mengisi formulir berikut dengan sebenar-benarnya. 
                Bantu kami mengenali anda dengan mudah.
            </p>
        </div>
        <CircularBox addClass='secondStepBox'>
            <div>
                <img src={topBar}/>
            </div>
            <hr className='shorterHr'/>
                <h3 className='contactTxt'>File</h3>
                <p className='informasiTxt'>Upload berkas yang diperlukan</p>
                  <div className='fileSystem'>
                  {files.map((fileItem) => (
                    <div key={fileItem.id} className='eachPart'>
                      <label htmlFor={`upload-${fileItem.id}`}>
                        <CircularBox addClass={`fileCardLayout ${
                          uploadedFiles[fileItem.id] ? 'uploaded' : ''
                        }`}>
                          <div className='outerImg'>
                            <img
                              src={
                                uploadedFiles[fileItem.id]
                                  ? URL.createObjectURL(uploadedFiles[fileItem.id])
                                  : fileItem.image_url
                              }
                              className='smallPic'
                            />
                          </div>
                          <p className='textClass'>{fileItem.name}</p>
                        </CircularBox>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id={`upload-${fileItem.id}`}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e, fileItem.id)}
                      />
                    </div>
                  ))}
                  </div>
            
        </CircularBox>
        <div className='bottomPrevNext'>
            <FancyButton section='Previous Step' className='prevButton' onClick={prevStep}/>
            <FancyButton section='Next Step' className='nextButton' onClick={ async (e) => {
              e.preventDefault();
              if(validateFiles())
              {
                await nextStep();
              }}}/>
        </div>
    </div>
  )
}

export default SecondStep
