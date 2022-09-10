import { ValidationError, useForm } from '@formspree/react';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from "react-toastify";

const initialState = {
  name: '',
  email: '',
  message: '',
  session: false
}

export const Contact = (props) => {
  const [{ name, email, message, session }, setState] = useState(initialState)
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, handleSubmit] = useForm('xqkjenaq', {
    data: { "g-recaptcha-response": executeRecaptcha }
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  };
  const clearState = () => setState({ ...initialState });

  useEffect(() => {
    if (state.submitting && !session) {
      setState((state) => ({
        ...state,
        session: true,
      }));
    } else if (state.succeeded && !state.submitting && session) {
      toast.success('We received your message!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      clearState();
    } else if (!state.succeeded && !state.submitting && session) {
      toast.error('Sorry we didn\'t received that! Please try again later!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setState((state) => ({
        ...state,
        session: false
      }))
    }
  }, [state, session])

  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name='sentMessage' validate onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        className='form-control'
                        placeholder='Name'
                        onChange={handleChange}
                        required
                      />
                      <ValidationError field="name" prefix="Name" errors={state.errors} />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        className='form-control'
                        placeholder='Email'
                        onChange={handleChange}
                        required
                      />
                      <ValidationError field="email" prefix="Email" errors={state.errors} />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    value={message}
                    className='form-control'
                    rows='4'
                    placeholder='Message'
                    onChange={handleChange}
                    required
                  ></textarea>
                  <ValidationError field="email" prefix="Email" errors={state.errors} />
                  <p className='help-block text-danger'></p>
                </div>
                <div> {/* Spam catcher */}
                  <input type="text" name="_gotcha" style={{display: "none"}} />
                </div>
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg' disabled={state.submitting}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className='col-md-3 col-md-offset-1 contact-info'>
            <div className='contact-item'>
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className='fa fa-map-marker'></i> Address
                </span>
                {props.data ? props.data.address : 'loading'}
              </p>
            </div>
            {/* <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-phone'></i> Phone
                </span>{' '}
                {props.data ? props.data.phone : 'loading'}
              </p>
            </div> */}
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope-o'></i> Email
                </span>{' '}
                {props.data ? props.data.email : 'loading'}
              </p>
            </div>
          </div>
          {/* <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : '/'}>
                      <i className='fa fa-facebook'></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : '/'}>
                      <i className='fa fa-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : '/'}>
                      <i className='fa fa-youtube'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2022 Metasquare L.L.C-FZ.
          </p>
        </div>
      </div>
    </div>
  )
}
