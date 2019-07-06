import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import BaseStore from '../../types/stores/BaseStore';
import { getPrimary } from '../styled/colors';
import LoaderProps from './types/LoaderProps';
import styled from 'styled-components';

const LoaderSvg = styled.svg<LoaderProps>`
    transition: opacity .3s;
    opacity: 0;
    visibility: hidden;
    height: ${ props => props.height };
    width: ${ props => props.width };
    
    ${ props => props.active && `
        opacity: 1;
        visibility: visible;
    ` }
`;

const Loader = ( { active = false, height = '200px', width = '200px' }: LoaderProps ) => {

    const themeMode = useSelector( ( store: BaseStore ) => store.theme.mode );
    const [ color, setColor ] = useState( getPrimary( themeMode ) );

    useEffect( () => {
        setColor(
            getPrimary( themeMode )
        )
    }, [ themeMode ] );

    return (
        <LoaderSvg width={ width } height={ height } active={ active } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-eclipse" style={ { background: 'none' } }>
            <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill={ color } transform="rotate(281.917 50 51)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
            </path>
        </LoaderSvg>
    )
};

export default connect()( Loader );
