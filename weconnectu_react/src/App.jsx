import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';

const API_BASE = import.meta.env.VITE_API_URL;;

export default function App() {

	const [tabIndex, setTabIndex] = useState('1');
	const [result, setResult] = useState([]);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);
	const [data, setData] = useState({id:0 ,
				username: '',
				email: '',
				phonenumber: '',
				message: '',
		});

	const fetchHistory = async () => {
		try {
			const response = await fetch(`${API_BASE}/api/userlist`, {
				method: "GET",
				headers: {
					"Accept": "application/json"
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP Error ${response.status}`);
			}

			const json = await response.json();

			setResult(json.data ?? []);

		} catch (err) {
			console.error(err);
		}
	};

// Handle the   retrieval  of user Detail 
	const fetchUserDetail = async (id) => {
		try {
			const response = await fetch(`${API_BASE}/api/userdetail/id/`+id);
			const json = await response.json();
			const user = Array.isArray(json.data) ? json.data[0] : null;
			setSelectedUser(user ?? null);

		} catch (err) {
			console.error('Failed to load user detail', err);
		}
	};


	useEffect(() => {
		if (tabIndex === '2') {
			fetchHistory();
		}
	}, [tabIndex]);


		// Handle  Page Submition to Store  user Information 
	const handleSubmit = async (e) => {

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRexex = /^(27|0)[1-8][0-9]{8}$/;

		e.preventDefault();
		setError('');
		setSuccess('');

		try {
			if (!data.username) {
				setError("Username is required.");
			}
			else  if (!data.email) {
				setError("Email is required.");
			} else if (!emailRegex.test(data.email)) {
				setError("Please enter a valid email address.");
			}else  if (!data.phonenumber) {
				setError("Email is required.");
			}else if(!phoneRexex.test(data.phonenumber)){

					setError("Please enter a valid SA Phone number.");
			}else if(!data.message){
					setError("Email is required.");
			} 
			else{

				const response = await fetch(`${API_BASE}/api/userstore`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: data.username,
						email: data.email,
						phonenumber: data.phonenumber,
						message: data.message,
					}),
				});

				const json = await response.json();

				if (!response.ok) {
					throw new Error(json.error || 'Failed to submit');
				}

				setData({ id : 0 , username: '', email: '', phonenumber: '', message: '' });
				setTabIndex('2');
				setSuccess('User Seccesfully added') ; 
				
			}
			
		} catch (err) {
			console.error('Failed to submit form', err);
			setError(err.message || 'Failed to submit form.');
		}
	};

return (
	<div className="flex min-h-screen flex-col items-center">

		<h2 className="mt-8 text-xl font-semibold leading-tight text-gray-800">
			<div className="transition-all duration-700 transform">
				<p className="text-gray-800">WeConnect U Technical Assessment</p>
			</div>
		</h2>

		{/* TAB: Setup*/}
		<div className="flex border-b border-gray-300 mb-6">
			{[
			{ key: '1', label: 'Submition Form' },
			{ key: '2', label: 'History' },
			].map((tab) => (
			<button
					type = "button"
					key={tab.key}
					className={`px-4 py-2 -mb-px text-sm font-medium text-gray-600 border-b-2 transition-colors duration-300 ${
					tabIndex === tab.key
					? 'border-blue-500 text-blue-600'
					: 'border-transparent hover:text-blue-500'
					}`}
					onClick={() => setTabIndex(tab.key)}
			>
			{tab.label}
			</button>
			))}
		</div>
		{/* TAB: Setup End*/}

		{/* TAB: FORM submition Content Start*/}
      	{tabIndex === '1' && (
			<>
				<div className="py-12">
					<h2 className="text-2xl font-bold mb-6">Submition Form</h2>
					<form onSubmit={handleSubmit} className="space-y-4 p-4">
						
						<div className="mt-6 flex flex-col items-center gap-3">
							{error && (
								<div className="w-72 bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
									{error}
								</div>
							)}
							<input
								type="text"
								value={data.username}
								onChange={(e) => setData({ ...data, username: e.target.value })}
								placeholder="Enter your username"
								className="w-72 rounded-md border border-gray-300 px-4 py-2 text-gray-800 focus:border-cyan-400 focus:outline-none"
							/>
							<input
								type="text"
								value={data.email}
								onChange={(e) => setData({ ...data, email: e.target.value })}
								placeholder="Enter your Email"
								className="w-72 rounded-md border border-gray-300 px-4 py-2 text-gray-800 focus:border-cyan-400 focus:outline-none"
							/>
							<input
								type="text"
								value={data.phonenumber}
								onChange={(e) => setData({ ...data, phonenumber: e.target.value })}
								placeholder="Enter your Phone Number"
								className="w-72 rounded-md border border-gray-300 px-4 py-2 text-gray-800 focus:border-cyan-400 focus:outline-none"
							/>
							<textarea
								value={data.message}
								onChange={(e) => setData({ ...data, message: e.target.value })}
								placeholder="Enter your Message"
								className="w-72 rounded-md border border-gray-300 px-4 py-2 text-gray-800 focus:border-cyan-400 focus:outline-none"
							/>

							<button
									type="submit"
									className="w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
							>
									Save
							</button>                                        
						</div>
					</form>
				</div>
			</>
     	)}{/* TAB: FORM submition Content End*/}
       
		{/* TAB: History Content Start*/}
		{tabIndex === '2' && (
			<>
				<div className="py-12">
					<div className="max-w-6xl mx-auto p-6">
						<h2 className="text-2xl font-bold mb-6">History</h2>

						{success && (
							<div className="w-72 bg-green-100 text-green-700 px-4 py-2 rounded text-sm">
								{success}
							</div>
						)}

						{!Array.isArray(result) || result.length === 0 ? (
							<div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded">
									No history found.
							</div>
						) : (
							<div className="overflow-x-auto bg-white rounded-lg shadow-md">
								<table className="min-w-full border-collapse">
									<thead>
										<tr className="bg-gray-100 text-gray-700">
											<th className="px-6 py-3 text-left text-sm font-semibold border-b">
												
											</th>
											<th className="px-6 py-3 text-left text-sm font-semibold border-b">
												UserName
											</th>
											<th className="px-6 py-3 text-left text-sm font-semibold border-b">
													Email
											</th>
											
										</tr>
									</thead>
									<tbody>
										{result.map((row, idx) => (
											<tr key={row.id ?? idx} className="border-b">
												<td className="px-6 py-3 text-sm text-gray-700">
													 <a data-tooltip-id="info-tooltip" data-tooltip-content="Click for User Detail!"
													 	onClick={() => fetchUserDetail(row.id )}
													 >
														<svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="16" x2="12" y2="12"></line>
														<line x1="12" y1="8" x2="12.01" y2="8"></line>
														</svg>
													</a>

													{/* Shared Tooltip Provider */}
													<Tooltip id="info-tooltip" place="top" effect="solid" />
												</td>
												<td className="px-6 py-3 text-sm text-gray-700"												
												>{row.name}</td>
												<td className="px-6 py-3 text-sm text-gray-700">{row.email}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>


				{selectedUser && (
					<div className="py-12 fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-90">
						<div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
							<h2 className="text-xl font-bold mb-4">
								{selectedUser.name}
							</h2>

							<div className="overflow-x-auto bg-white rounded-lg shadow-md">
								<table className="min-w-full border-collapse">
									<tbody>
										<tr className="border-b">
											<td className="px-6 py-3 text-left text-sm font-semibold bg-gray-100 text-gray-700 border-b">User Name</td>
											<td className="px-6 py-3 text-sm text-gray-700">{selectedUser.name}</td>
										</tr>
										<tr className="border-b">
											<td className="px-6 py-3 text-left text-sm font-semibold bg-gray-100 text-gray-700 border-b">Email Address</td>
											<td className="px-6 py-3 text-sm text-gray-700">{selectedUser.email}</td>
										</tr>
										<tr className="border-b">
											<td className="px-6 py-3 text-left text-sm font-semibold bg-gray-100 text-gray-700 border-b">Phone Number</td>
											<td className="px-6 py-3 text-sm text-gray-700">{selectedUser.phonenumber}</td>
										</tr>
										<tr className="border-b">
											<td className="px-6 py-3 text-left text-sm font-semibold bg-gray-100 text-gray-700 border-b">Message</td>
											<td className="px-6 py-3 text-sm text-gray-700">{selectedUser.message}</td>
										</tr>
									</tbody>
								</table>
							</div>

							<br/>


							{/* Close Button */}
							<div className="mt-6 flex justify-center">
								<button
									onClick={() => setSelectedUser(null)}
									className="w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				)}
			</>
		)} {/* TAB: History Content  End*/}
    </div>
  )}