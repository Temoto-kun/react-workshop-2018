// RegistrantList is a component that displays all registrants and a search feature for filtering
// registrants.

// This is a way simpler form to demonstrate.

import React from 'react';
import TextBox from './TextBox';

function RegistrantList({ onSearch, query, registrants, selectedRegistrant, onFieldChange, onSelect }) {
	return (
		<React.Fragment>
			<form className="mb-3" onSubmit={ onSearch }>
				<div className="card">
					<div className="card-header">
						<h2 className="card-title">Search</h2>
					</div>
					<div className="card-body">
						<TextBox id="query" name="query" value={ query } label="Query" onChange={ onFieldChange }/>
					</div>
				</div>
			</form>
			{
				registrants.length > 0 ?
					<div className="card-columns">
						{
							registrants.map(registrant => (
								<div
									className={ selectedRegistrant && registrant.id === selectedRegistrant.id ? 'card border-primary' : 'card' }
									key={registrant.id}
									onClick={ () => { onSelect(registrant) } }
								>
									<img src={ registrant.image } alt={ registrant.name } className="card-img-top"/>
									<div className="card-body">
										<div className="card-title">
											{ registrant.name }
										</div>
										<div className="card-text">
											<small>
												<dl>
													<dt>Email</dt>
													<dd>{ registrant.email }</dd>
													<dt>Phone Number</dt>
													<dd>{ registrant.phone }</dd>
												</dl>
											</small>
										</div>
									</div>
								</div>
							))
						}
					</div> :
					<div className="text-center p-5">
						<p>No registrants found.</p>
					</div>
			}
		</React.Fragment>
	)
}

export default RegistrantList;
