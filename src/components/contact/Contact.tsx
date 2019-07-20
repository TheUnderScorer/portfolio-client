import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { ContactTitle, ContactWrapper } from './styled';
import { useSpring } from 'react-spring';

const Contact = () =>
{
    const { active = false, type } = useSelector( ( store: HomeStore ) => ( {
        active: store.contact.active,
        type:   store.contact.type
    } ) );

    const [ finishedAnimation, setFinishedAnimation ] = useState( false );

    useEffect( () =>
    {
        if ( !active ) {
            setFinishedAnimation( false );
        }
    }, [ active ] );

    const props = useSpring( {
        opacity:         active ? 1 : 0,
        transform:       `scale(${ active ? 1 : 0 })`,
        transformOrigin: 'right top',
        onRest:          useCallback( () =>
        {
            if ( active ) {
                setFinishedAnimation( true );
            }
        }, [ active ] )
    } );

    return (
        <ContactWrapper finishedAnimation={ finishedAnimation } style={ props }>
            { !type &&
              <ContactTitle>
                  How would you like to contact me?
              </ContactTitle>
            }
        </ContactWrapper>
    );
};

export default connect()( Contact );
