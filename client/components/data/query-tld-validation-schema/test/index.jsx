/** @format */
/**
 * External dependencies
 */
import React from 'react';
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import { QueryTldValidationSchema } from '../';

describe( 'QueryTldValidationSchema', () => {
	const defaultMocks = {
		validationSchemas: {},
		tlds: [],
		requestValidationSchemas: () => {},
	};
	test( 'should request the specified tlds', () => {
		const requestValidationSchemas = jest.fn();
		const testProps = {
			...defaultMocks,
			requestValidationSchemas,
			tlds: [ 'uk', 'fr', 'notreal' ],
		};

		shallow( <QueryTldValidationSchema { ...testProps } /> );

		expect( requestValidationSchemas.mock.calls.length ).toBe( 1 );
		expect( requestValidationSchemas.mock.calls[ 0 ][ 0 ] ).toEqual( [ 'uk', 'fr', 'notreal' ] );
	} );

	test( 'should not re-request tlds', () => {
		const requestValidationSchemas = jest.fn();
		const testProps = {
			...defaultMocks,
			requestValidationSchemas,
			tlds: [ 'uk', 'fr', 'notreal' ],
			validationSchemas: { fr: { what: 'ever' } },
		};

		shallow( <QueryTldValidationSchema { ...testProps } /> );

		expect( requestValidationSchemas.mock.calls.length ).toBe( 1 );
		expect( requestValidationSchemas.mock.calls[ 0 ][ 0 ] ).toEqual( [ 'uk', 'notreal' ] );
	} );

	test( 'should not issue a request for no tlds', () => {
		const requestValidationSchemas = jest.fn();
		const testProps = {
			...defaultMocks,
			tlds: [ 'uk', 'fr' ],
			validationSchemas: {
				fr: { what: 'ever' },
				uk: { anything: {} },
			},
		};

		shallow( <QueryTldValidationSchema { ...testProps } /> );

		expect( requestValidationSchemas.mock.calls.length ).toBe( 0 );
	} );
} );
