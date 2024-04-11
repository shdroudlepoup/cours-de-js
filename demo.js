export const form = (req, res) => {
    res.send(`<html>
    <form>

        <!-- Commentaire HTML -->
        <input name="text"></input> <br/>
        <input type="number" name="num" /> <br/>

        <textarea name="longtext"></textarea> <br/>


        <input type="hidden" name="cache" value="jesuiscache" />

        <label> Une checkbox
           <input type="checkbox" name="check" />
        </label><br />

        <input type="radio" name="opt" value="Opt1" />Option 1 <br>
        <input type="radio" name="opt" value="Opt2" />Option 2 <br>
        <input type="radio" name="opt" value="Opt3" />Option 3 <br>
        <input type="radio" name="opt" value="Opt4" />Option 4 <br><br>

        <input type="radio" name="opt2" value="Opt1" />Option 1 <br>
        <input type="radio" name="opt2" value="Opt2" />Option 2 <br>


        Moi je suis masqué: <input name="pass" type="password" /> <br/>

        Choisi ta couleur <input name="couleur" type="color" /> <br/>

        <select name="monchoix">
            <option value="volvo">   Volvo   </option>
            <option value="saab">    Saab    </option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">    Audi    </option>
        </select> <br/>    

        <button type="submit">OK</submit>
        <button type="reset">Reset"</reset>

    </form>
    </html>`)
}