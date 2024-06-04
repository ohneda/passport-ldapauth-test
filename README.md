## Usage Instructions

### Prerequisites

- Node.js installed on your system
- An LDAP server setup and accessible

### Setting up the project

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Create a `.env` file in the project root directory and add your LDAP configuration:
   ```
   LDAP_URL=ldap://localhosst:389
   LDAP_BIND_DN=cn=root
   LDAP_BIND_CREDENTIALS=password
   LDAP_SEARCH_BASE=o=users,o=example.com
   LDAP_SEARCH_FILTER=mail={{username}}
   ```
4. Install the required dependencies by running:
   ```
   npm install
   ```

### Running the server

1. Start the server by executing:
   ```
   node index.js
   ```
   This will start the server on port 8080.

### Logging in using the command line

#### Using the `login.sh` script

To log in using the provided `login.sh` script, follow these steps:

1. Open your terminal.
2. Ensure the script is executable. If not, make it executable by running:
   ```
   chmod +x login.sh
   ```
3. Execute the script with your username and password:
   ```
   ./login.sh <username> <password>
   ```
   Replace `<username>` and `<password>` with your actual LDAP credentials.

#### Using `curl`

You can also log in manually using `curl` with the following command:

1. Open your terminal.
2. Execute the `curl` command with your username and password:
   ```sh
   curl -X POST http://localhost:8080/login -d "username=<username>&password=<password>" -H "Content-Type: application/x-www-form-urlencoded"
   ```
   Replace `<username>` and `<password>` with your actual LDAP credentials.

### Expected Output

- If the credentials are correct, you will receive the user details as a response.
- If the credentials are incorrect, you will receive an error message indicating the failure.

