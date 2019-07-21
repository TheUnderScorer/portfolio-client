import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { ContactWrapper, Error, FormTitle, IconContainer, Inner } from './styled';
import { FaIcon, Text } from '../styled/typography';
import { useSpring } from 'react-spring';
import { SetContactActive } from '../../types/actions/ContactActions';
import { useQuery } from 'react-apollo-hooks';
import { GET_ME } from '../../graphql/queries/users';
import Loader from '../loader/Loader';
import UserForm from './UserForm';
import useUpdateUser from '../../hooks/useUpdateUser';
import { GetMeResult } from '../../types/graphql/Queries';

const Contact = () =>
{
    const dispatch = useDispatch();

    const { data, ...userQuery } = useQuery<GetMeResult>( GET_ME );
    const { me: user = {} } = data || {};

    const userMutation = useUpdateUser( async () =>
    {
        await userQuery.updateQuery( ( oldUser ) =>
        {
            return {
                me: {
                    ...oldUser.me,
                    ...userMutation[ 1 ].data
                }
            }
        } );
    } );

    const { active = false } = useSelector( ( store: HomeStore ) => ( {
        active: store.contact.active,
        type:   store.contact.type
    } ) );

    const toggleActive = useCallback( () =>
    {
        const action: SetContactActive = {
            type:    'SetContactActive',
            payload: !active
        };

        dispatch( action );
    }, [ active ] );

    const [ , setFinishedAnimation ] = useState( false );

    useEffect( () =>
    {
        if ( !active ) {
            setFinishedAnimation( false );
        }
    }, [ active ] );

    const props = useSpring( {
        opacity:         active ? 1 : 0,
        transform:       `scale(${ active ? 1 : 0 })`,
        transformOrigin: 'right bottom',
        onRest:          useCallback( () =>
        {
            if ( active ) {
                setFinishedAnimation( true );
            }
        }, [ active ] )
    } );

    const renderError = ( message: string ) => (
        <Error>
            <Text>
                { message }
            </Text>
        </Error>
    );

    return (
        <ContactWrapper>
            <IconContainer active={ active } onClick={ toggleActive } ripple={ true }>
                { active ?
                    <FaIcon icon="times"/> :
                    <FaIcon icon="comment"/>
                }
            </IconContainer>
            <Inner style={ props }>
                <Loader active={ userQuery.loading } asOverlay={ true } svgProps={ {
                    width:  '30%',
                    height: '30%'
                } }/>
                <FormTitle className="form-title">
                    Let's start with some basic info { user && user.name }!
                </FormTitle>
                { userQuery.error &&
                  renderError( userQuery.error.message )
                }
                { userMutation[ 1 ].error &&
                  renderError( userMutation[ 1 ].error.message )
                }
                { user && ( !user.name || !user.email ) &&
                  <UserForm user={ user } mutation={ userMutation }/>
                }
            </Inner>
        </ContactWrapper>
    );
};

export default connect()( Contact );
