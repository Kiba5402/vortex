import { sign, verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const clave = 'clave_secreta'

class loginController {

    signUp(req: Request, res: Response): void {
        //creamos el usuario
        const user = {
            id: '1234667',
            name: 'Cristian',
            apellido: 'Reyes'
        }
        //creamos el token
        const token = sign(user, clave, {
            expiresIn: 60 * 60 * 24
        });
        //retornamos el token
        /*res.setHeader('Set-Cookie', `tokenHO=; expires=Thu, 01 Jan 1970 00:00:01 HttpOnly`);*/
        res.setHeader('Set-Cookie', `tokenHO=${token}; HttpOnly`);
        res.sendStatus(200);
        /* res.json({ 'auth': true, token }); */
    }

    signOut(req: Request, res: Response): void {
        res.setHeader('Set-Cookie', `tokenHO=; expires=Thu, 01 Jan 1970 00:00:01 HttpOnly`);
        res.sendStatus(200);
    }

    verifySign(req: any, res: Response, next: NextFunction): void {

        if (req.headers.cookie != undefined) {
            let header: any = req.headers.cookie?.split('=');
            const token = header[1];
            try {
                const infoDecoded = verify(token, clave);
                req.infoUsr = infoDecoded;
                next();
            } catch (e) {
                res.status(401).json({
                    auth: false,
                    message: 'no autorizado' + e
                });
            }
        } else {
            res.status(201).json({
                auth: false,
                message: 'Sin Token'
            });
        }

    }

}

export { loginController }