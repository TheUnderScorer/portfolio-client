import * as React from 'react';
import { lazy, useCallback, useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import HomeStore from '../../types/stores/HomeStore';
import { ContactSlider, ContactWrapper, Error, FormTitle, FormTitleContainer, IconContainer, Inner } from './styled';
import { FaIcon, Text } from '../styled/typography';
import { useSpring } from 'react-spring';
import { SetContactActive, SetContactType } from '../../types/actions/ContactActions';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { GET_ME } from '../../graphql/queries/users';
import Loader from '../loader/Loader';
import UserForm from './UserForm';
import useUpdateUser from '../../hooks/useUpdateUser';
import { GetMeResult } from '../../types/graphql/Queries';
import getFormTitle from './getFormTitle';
import { Settings } from 'react-slick';
import ContactReducer, { ContactTypes } from '../../types/reducers/ContactReducer';
import Selection from '../selection/Selection';
import contactSelections from '../../pages/data/contactSelections';
import Result from '../../types/graphql/Result';
import { SEND } from '../../graphql/queries/contact';
import useApolloErrors from '../../hooks/useApolloErrors';
import { ContactInputVariable } from '../../types/graphql/inputs/ContactInput';
import { SelectionCallback } from '../selection/types/SelectionProps';
import { IconButton } from '../styled/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@material-ui/core';

const ContactForm = lazy( () => import('./ContactForm') );

const sections = {
    [ ContactTypes.UserForm ]:    0,
    [ ContactTypes.Selection ]:   1,
    [ ContactTypes.Chat ]:        3,
    [ ContactTypes.ContactForm ]: 2
};

const titlesWithReturnIcon = [ ContactTypes.ContactForm, ContactTypes.Chat ];
const shouldAddIcon = ( type: ContactTypes ) => titlesWithReturnIcon.includes( type );

const sliderSettings: Settings = {
    autoplay:       false,
    dots:           false,
    arrows:         false,
    draggable:      false,
    slidesToScroll: 1,
    slidesToShow:   1,
};

const ContactError = ( { message = '' } ) =>
{
    return (
        <Error>
            <Text>
                { message }
            </Text>
        </Error>
    )
};

const Contact = () =>
{
    const dispatch = useDispatch();

    const userQuery = useQuery<GetMeResult>( GET_ME );
    const { me: user = {} } = userQuery.data || {};

    const contactMutation = useMutation<Result, ContactInputVariable>( SEND );
    const [ , contactMutationResult ] = contactMutation;

    const userMutation = useUpdateUser( async () =>
    {
        await userQuery.updateQuery( ( oldUser ) => ( {
            me: {
                ...oldUser.me,
                ...userMutation[ 1 ].data
            }
        } ) );
    } );
    const [ , userMutationResult ] = userMutation;

    const [ errors, setErrors ] = useApolloErrors( [
        userQuery,
        userMutation[ 1 ],
        contactMutation[ 1 ],
    ] );

    const slider = useRef() as any;
    const [ currentSlide, setSlide ] = useState( 0 );

    const { active = false, type }: ContactReducer = useSelector( ( store: HomeStore ) => ( {
        active: store.contact.active,
        type:   store.contact.type
    } ) );

    const setSection: SelectionCallback<ContactTypes> = useCallback( ( section: ContactTypes ) =>
    {
        const action: SetContactType = {
            type:    'SetContactType',
            payload: section,
        };

        dispatch( action );
    }, [ dispatch ] );
    const handleReturnClick = () => setSection( ContactTypes.Selection );

    const toggleActive = useCallback( () =>
    {
        const action: SetContactActive = {
            type:    'SetContactActive',
            payload: !active
        };

        dispatch( action );
    }, [ active, dispatch ] );

    const props = useSpring( {
        opacity:         active ? 1 : 0,
        transform:       `scale(${ active ? 1 : 0 })`,
        transformOrigin: 'right bottom',
    } );

    useEffect( () =>
    {
        setErrors( [
            userQuery,
            userMutation[ 1 ],
            contactMutation[ 1 ],
        ] );
    }, [ userQuery.error, userMutationResult.error, contactMutationResult.error ] );

    // Moves to current slide
    useEffect( () =>
    {
        if ( !slider.current ) {
            return;
        }

        slider.current.slickGoTo( currentSlide );
    }, [ currentSlide, slider ] );

    // Updates section index on change
    useEffect( () =>
    {
        if ( !type ) {
            return;
        }

        const section = sections[ type ];

        setSlide( section );
    }, [ type ] );

    // Moves to first section after used filled UserForm
    useEffect( () =>
    {
        // User have filled the form, move him to next slide
        if ( currentSlide === 0 && user && user.name ) {
            setSection( ContactTypes.Selection )
        }
    }, [ user, currentSlide ] );

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
                <FormTitleContainer>
                    { shouldAddIcon( type ) &&
                      <Tooltip title="Return to selection">
                          <IconButton buttonHeight="32px" buttonWidth="32px" onClick={ handleReturnClick } flat={ true } transparent={ true }>
                              <FontAwesomeIcon icon="arrow-left"/>
                          </IconButton>
                      </Tooltip>
                    }
                    <FormTitle className="form-title">
                        { getFormTitle( type, user ) }
                    </FormTitle>
                </FormTitleContainer>
                { errors.length > 0 && errors.map( ( item, index ) =>
                    <ContactError message={ item && item.error ? item.error.message : '' } key={ index }/>
                ) }
                <ContactSlider className="contact-slider" ref={ slider } { ...sliderSettings }>
                    <UserForm user={ user } mutation={ userMutation }/>
                    <Selection<ContactTypes> onSelection={ setSection } options={ contactSelections }/>
                    <ContactForm user={ user } mutation={ contactMutation }/>
                </ContactSlider>
            </Inner>
        </ContactWrapper>
    );
};

export default connect()( Contact );
