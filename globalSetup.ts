import * as os from 'os';

const CPUs = os.cpus();

async function globalSetup() {
    console.log('System info : ', CPUs.length + 'CPUs');
    CPUs.forEach((v) => {
        console.log('Model:' + v.model);
        console.log('Speed:' + v.speed);
    });
    // try {
    //     fs.readdirSync(path.resolve(__dirname, './logs')).forEach((file) => {
    //         if (file !== '.gitignore') {
    //             fs.unlinkSync(path.join(path.resolve(__dirname, './logs'), file));
    //         }
    //     });
    // } catch (e) {
    //     console.info(`Can't delete file, error: ${e}`);
    // }
}

export default globalSetup;