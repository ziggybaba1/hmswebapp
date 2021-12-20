import React from "react"
import ContentLoader from "react-content-loader"

export const roundImage = (props) => {
    <div className={"col-md-"+props.md} >
                <ContentLoader 
                  speed={2}
                //   width={400}
                //   height={160}
                  viewBox="0 0 400 160"
                  backgroundColor="#d6d1d1"
                  foregroundColor="#616161"
                  {...props}
                >
                  <circle cx="20" cy="20" r="20" />
                </ContentLoader>
            </div>
};

export const Loading=(props)=>{
    return (
        <div>
        <b className={props.textClass}><i className={'fas fa-spinner fa-spin'}  aria-hidden="true" /> {props.text}</b> 
          </div>
  );
}

export const TextLoad = (props) => {
    <div className={"col-md-"+props.md} >
                <ContentLoader 
                  speed={2}
                //   width={400}
                //   height={160}
                  viewBox="0 0 400 160"
                  backgroundColor="#d6d1d1"
                  foregroundColor="#616161"
                  {...props}
                >
                  <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
                </ContentLoader>
            </div>
}
